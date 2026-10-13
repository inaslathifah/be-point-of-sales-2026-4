import { Router } from "express";
import {
  createProducts,
  deleteProducts,
  getAllProducts,
  getOneProducts,
  updateProducts,
} from "../controllers/productController.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getOneProducts);
router.post("/", createProducts);
router.put("/:id", updateProducts);
router.delete("/:id", deleteProducts);

export default router;
