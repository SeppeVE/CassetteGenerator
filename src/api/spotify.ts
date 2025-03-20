const CLIENT_ID = "";
const CLIENT_SECRET = "";
const TOKEN_URL = "";
const SEARCH_URL = "";

let accessToken = "";

// Function to get an access token
async function fetchAccessToken() {
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
  });

  const data = await response.json();
  accessToken = data.access_token;
}

// Function to search for a song
export async function searchSpotify(title: string, artist: string) {
  if (!accessToken) await fetchAccessToken();

  const query = encodeURIComponent(`${title} ${artist}`);
  const url = `${SEARCH_URL}?q=${query}&type=track&limit=1`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const data = await response.json();
  console.log(`Data: ${data}`);
  return data.tracks.items;
}
