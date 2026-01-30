import {
  getTrayToken,
  getCustomerByEmail,
  getCustomerCNPJs,
  getCustomerGroups,
  getCategories,
  getProducts,
  getPriceTable,
  createOrder
} from "../services/trayService.js";

export async function loadUserContext(req, res) {
  try {
    const { email } = req.query;

    const token = await getTrayToken();
    const customer = await getCustomerByEmail(email, token);

    if (!customer) {
      return res.status(404).json({ error: "Cliente não encontrado na Tray" });
    }

    const cnpjs = await getCustomerCNPJs(customer.id, token);
    const groups = await getCustomerGroups(customer.id, token);
    const categories = await getCategories(token);
    const priceTable = await getPriceTable(customer.id, token);

    res.json({
      customer,
      cnpjs,
      groups,
      categories,
      priceTable
    });
  } catch (err) {
    console.error("Erro contexto Tray:", err.message);
    res.status(500).json({ error: "Erro ao carregar contexto Tray" });
  }
}

export async function getTrayProducts(req, res) {
  try {
    const token = await getTrayToken();
    const products = await getProducts(token);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
}

export async function createTrayOrder(req, res) {
  try {
    const token = await getTrayToken();
    const order = await createOrder(req.body, token);
    res.json(order);
  } catch (err) {
    console.error("Erro pedido:", err.message);
    res.status(500).json({ error: "Erro ao criar pedido na Tray" });
  }
}
