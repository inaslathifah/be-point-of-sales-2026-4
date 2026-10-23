import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/transaction", transactionRoutes);

app.get("/", (req, res) => {
  // req: mengambil data dari body dan parameter
  // req.body, req.params
  res.json({ message: "Welcome to POS API" });
});

export default app;
