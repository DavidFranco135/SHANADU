import axios from 'axios';

export async function getTrayToken() {
  const res = await axios.post(`${process.env.TRAY_API_URL}/auth`, {
    client_id: process.env.TRAY_CLIENT_ID,
    client_secret: process.env.TRAY_CLIENT_SECRET,
    grant_type: 'client_credentials'
  });

  return res.data.access_token;
}
