import pool from "../config/db.js";

// get all data, get one data, create data, update data, delete data

export const getAllCategories = async (req, res) => {
  try {
    const [categories] = await pool.query(
      "SELECT * FROM categories ORDER BY id DESC",
    );
    return res.status(200).json({
      status: true,
      total: categories.length,
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const getOneCategory = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        status: false,
        message: "not a number",
      });
    }
    const [category] = await pool.query("SELECT* FROM categories WHERE id=?", [
      id,
    ]);
    if (category.length === 0) {
      return res.status(404).json({
        status: false,
        message: "there's no data",
      });
    }
    return res.status(200).json({
      status: true,
      data: category,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        status: false,
        message: "Name must be required",
      });
    }
    const [category] = await pool.query(
      "INSERT INTO categories(name) VALUES (?)",
      [name],
    );
    return res.status(201).json({
      status: true,
      message: "Create Data Category Success",
      data: category,
    });
  } catch (error) {
    if (error.code === ER_DUP_ENTRY) {
      return res.status(400).json({
        status: false,
        message: "Category Name is Already Exist",
      });
    }
    return res.status(500).json({
      status: false,
      message: error.message,
      error: error.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  try {
    const [category] = await pool.query(
      "UPDATE categories SET name=? WHERE id=?",
      [id, name],
    );
    if (category.length === 0) {
      return res.status(404).json({
        status: false,
        message: "Data not found",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Update Category Success",
      data: category,
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
export const deleteCategory = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await pool.query("DELETE FROM categories WHERE id=?", [id]);
    return res.status(200).json({
      status: true,
      message: "Delete Category Success",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
