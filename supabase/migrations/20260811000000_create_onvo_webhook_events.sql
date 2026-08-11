create table if not exists public.onvo_webhook_events (
  event_id text primary key,
  event_type text not null,
  payment_intent_id text,
  buyer_email text not null,
  status text not null default 'processing' check (status in ('processing', 'completed', 'failed')),
  attempts integer not null default 1,
  payload jsonb not null default '{}'::jsonb,
  buyer_email_sent_at timestamptz,
  internal_email_sent_at timestamptz,
  processing_started_at timestamptz not null default now(),
  completed_at timestamptz,
  last_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.onvo_webhook_events enable row level security;
revoke all on public.onvo_webhook_events from anon, authenticated;

create or replace function public.claim_onvo_webhook_event(
  p_event_id text,
  p_event_type text,
  p_payment_intent_id text,
  p_buyer_email text,
  p_payload jsonb
) returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  current_status text;
  current_started_at timestamptz;
begin
  insert into public.onvo_webhook_events (
    event_id, event_type, payment_intent_id, buyer_email, payload
  ) values (
    p_event_id, p_event_type, p_payment_intent_id, p_buyer_email, p_payload
  ) on conflict (event_id) do nothing;

  if found then
    return 'claimed';
  end if;

  select status, processing_started_at
  into current_status, current_started_at
  from public.onvo_webhook_events
  where event_id = p_event_id
  for update;

  if current_status = 'completed' then
    return 'completed';
  end if;

  if current_status = 'processing' and current_started_at > now() - interval '5 minutes' then
    return 'processing';
  end if;

  update public.onvo_webhook_events
  set status = 'processing',
      attempts = attempts + 1,
      processing_started_at = now(),
      updated_at = now(),
      last_error = null,
      payment_intent_id = p_payment_intent_id,
      buyer_email = p_buyer_email,
      payload = p_payload
  where event_id = p_event_id;

  return 'claimed';
end;
$$;

revoke all on function public.claim_onvo_webhook_event(text, text, text, text, jsonb) from public, anon, authenticated;
grant execute on function public.claim_onvo_webhook_event(text, text, text, text, jsonb) to service_role;
