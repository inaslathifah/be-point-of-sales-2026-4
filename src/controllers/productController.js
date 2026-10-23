import pool from "../config/db.js";

// get all
export const getAllProducts = async (req, res) => {
  try {
    const [products] = await pool.query(
      "SELECT products.*, categories.name AS category_name FROM products LEFT JOIN categories ON products.category_id = categories.id",
    );
    return res.status(200).json({
      status: true,
      true: products.length,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// get one data
export const getOneProducts = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [products] = await pool.query(
      "SELECT products.*, categories.name AS category_name FROM products LEFT JOIN categories ON products.category_id = categories.id WHERE products, id=?",
      [id],
    );
    return res.status(200).json({
      status: true,
      true: products.length,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// create
export const createProducts = async (req, res) => {
  try {
    const { category_id, name, price, stock, description } = req.body;

    await pool.query(
      "INSERT INTO products(category_id, name, price, stock, description) VALUES (?, ?, ?, ?, ?)",
      [category_id, name, price, stock, description],
    );
    return res.status(201).json({
      status: true,
      message: "Create Data Products Success",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// update
export const updateProducts = async (req, res) => {
  const id = parseInt(req.params.id);
  const { category_id, name, price, stock, description, is_active } = req.body;
  try {
    await pool.query(
      "UPDATE product SET category_id=?, name=?, price=?, stock=?, description=?, is_active=? WHERE id=?",
      [id, category_id, name, price, stock, description, is_active ?? 1],
    );
    return res.status(200).json({
      status: true,
      message: "Update Products Success",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
      error: error.message,
    });
  }
};

// delete
export const deleteProducts = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await pool.query("DELETE FROM products WHERE id=?", [id]);
    return res.status(200).json({
      status: true,
      message: "Delete Product Success",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
