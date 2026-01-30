import express from "express";
import {
  loadUserContext,
  getTrayProducts,
  createTrayOrder
} from "../controllers/trayController.js";

const router = express.Router();

router.get("/context", loadUserContext);
router.get("/products", getTrayProducts);
router.post("/order", createTrayOrder);

export default router;
