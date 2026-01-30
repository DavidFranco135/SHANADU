import axios from 'axios';
import { getTrayToken } from './trayAuth.js';

export async function getCustomerByEmail(email) {
  const token = await getTrayToken();

  const res = await axios.get(
    `${process.env.TRAY_API_URL}/customers`,
    {
      headers: { Authorization: `Bearer ${token}` },
      params: { email }
    }
  );

  return res.data?.data?.[0] || null;
}

export async function getCustomerCNPJs(customerId) {
  const token = await getTrayToken();

  const res = await axios.get(
    `${process.env.TRAY_API_URL}/customers/${customerId}/cnpjs`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return res.data?.data || [];
}

export async function getTrayCategories() {
  const token = await getTrayToken();

  const res = await axios.get(
    `${process.env.TRAY_API_URL}/categories`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return res.data?.data || [];
}

export async function getCustomerGroup(customerId) {
  const token = await getTrayToken();

  const res = await axios.get(
    `${process.env.TRAY_API_URL}/customers/${customerId}/groups`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return res.data?.data?.[0] || null;
}
