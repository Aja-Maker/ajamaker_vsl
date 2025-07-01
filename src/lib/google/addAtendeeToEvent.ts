import { getGoogleAccessToken } from './getAccessToken';

interface AddAttendeeOptions {
  calendarId: string;
  eventId: string;
  attendeeEmail: string;
  attendeeName?: string;
}

/**
 * Adds an attendee to a Google Calendar event if not already present.
 * Throws an error if the attendee already exists or if anything fails.
 */
export async function addAttendeeToEvent({
  calendarId,
  eventId,
  attendeeEmail,
  attendeeName,
}: AddAttendeeOptions): Promise<void> {
  const accessToken = await getGoogleAccessToken();

  // 1. Fetch existing event
  const getResponse = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events/${eventId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const existingEvent = await getResponse.json();

  if (!getResponse.ok) {
    console.error('❌ Failed to fetch event:', existingEvent);
    throw new Error(`Error fetching event: ${existingEvent.error?.message || getResponse.statusText}`);
  }

  const currentAttendees = existingEvent.attendees || [];

  // 2. Check if attendee is already added
  const alreadyExists = currentAttendees.some(
    (attendee: any) => attendee.email === attendeeEmail
  );

  if (alreadyExists) {
    console.log(`⚠️ Attendee ${attendeeEmail} is already on the event.`);
    throw new Error(`Attendee ${attendeeEmail} is already added to event ${eventId}.`);
  }

  // 3. Append the new attendee
  const updatedAttendees = [
    ...currentAttendees,
    { email: attendeeEmail, displayName: attendeeName },
  ];

  // 4. Update the event
  const patchResponse = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events/${eventId}?sendUpdates=all`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        attendees: updatedAttendees,
      }),
    }
  );

  const patchData = await patchResponse.json();

  if (!patchResponse.ok) {
    console.error('❌ Failed to update attendees:', patchData);
    throw new Error(`Error updating event: ${patchData.error?.message || patchResponse.statusText}`);
  }

  console.log(`✅ Attendee ${attendeeEmail} successfully added to event ${eventId}.`);
}
