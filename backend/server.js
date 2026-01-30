import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {
  getCustomerByEmail,
  getCustomerCNPJs,
  getTrayCategories,
  getCustomerGroup
} from './trayService.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post('/login', async (req, res) => {
  try {
    const { email } = req.body;

    const customer = await getCustomerByEmail(email);
    if (!customer) {
      return res.status(404).json({ error: 'Cliente não encontrado na Tray' });
    }

    const cnpjs = await getCustomerCNPJs(customer.id);
    const group = await getCustomerGroup(customer.id);
    const categories = await getTrayCategories();

    res.json({
      customer,
      group,
      cnpjs,
      categories
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Erro integração Tray' });
  }
});

app.listen(3333, () => {
  console.log('🚀 Backend Tray rodando em http://localhost:3333');
});
