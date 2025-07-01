// lib/google/getAccessToken.ts

export async function getGoogleAccessToken(): Promise<string> {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_OAUTH_CLIENT_ID!,
    client_secret: process.env.GOOGLE_OAUTH_SECRET!,
    refresh_token: process.env.GOOGLE_OAUTH_REFRESH_TOKEN!,
    grant_type: 'refresh_token',
  });

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('Failed to get access token:', data);
    throw new Error('Failed to get Google access token');
  }

  return data.access_token as string;
}
