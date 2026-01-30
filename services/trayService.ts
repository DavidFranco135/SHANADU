import axios from "axios";

const api = axios.create({
  baseURL: process.env.TRAY_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// 🔐 Token
export async function getTrayToken() {
  const res = await axios.post(`${process.env.TRAY_API_URL}/auth/token`, {
    client_id: process.env.TRAY_CLIENT_ID,
    client_secret: process.env.TRAY_CLIENT_SECRET,
    store_code: process.env.TRAY_STORE_CODE
  });

  return res.data.access_token;
}

// 🔎 Cliente por email
export async function getCustomerByEmail(email, token) {
  const res = await api.get(`/customers?email=${email}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data?.data?.[0];
}

// 🧾 CNPJs
export async function getCustomerCNPJs(customerId, token) {
  const res = await api.get(`/customers/${customerId}/cnpjs`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data?.data || [];
}

// 👥 Grupo
export async function getCustomerGroups(customerId, token) {
  const res = await api.get(`/customers/${customerId}/groups`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data?.data || [];
}

// 🗂️ Categorias
export async function getCategories(token) {
  const res = await api.get(`/categories`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data?.data || [];
}

// 📦 Produtos
export async function getProducts(token) {
  const res = await api.get(`/products`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data?.data || [];
}

// 💰 Tabela de preço
export async function getPriceTable(customerId, token) {
  const res = await api.get(`/customers/${customerId}/price-table`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

// 🧾 Pedido real
export async function createOrder(payload, token) {
  const res = await api.post(`/orders`, payload, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}
