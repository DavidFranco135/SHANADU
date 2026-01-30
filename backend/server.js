import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import trayRoutes from "./routes/trayRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tray", trayRoutes);

app.get("/", (req, res) => {
  res.send("B2B Backend rodando 🚀");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
