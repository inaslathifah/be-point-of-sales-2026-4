import pool from "../config/db.js";
const USERS = [
  {
    id: 1,
    name: "John",
    email: "john@gmail.com",
    password: "123456789",
  },
  {
    id: 2,
    name: "James",
    email: "james@gmail.com",
    password: "123456789",
  },
  {
    id: 3,
    name: "Tommy",
    email: "tommy@gmail.com",
    password: "123456789",
  },
];

// CRUD (Create, Read, Update, Delete)
export const getAllUser = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, name, email, is_active FROM user",
    );
    return res.status(200).json({
      status: true,
      message: "Fetch user success",
      total: rows.length,
      data: rows,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
      error: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  const id = parseInt(req.params.id);
  const [user] = await pool.query(
    "SELECT id, name, email, is_active FROM user WHERE id=?",
    [id],
  );
  if (user.length === 0) {
    return res.status(404).json({
      status: false,
      message: "User Not Found",
    });
  }
  return res.status(200).json({
    status: true,
    message: "User success",
    data: user,
  });
};

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const [user] = await pool.query(
      "INSERT INTO user(name, email, password) VALUES (?, ?, ?)",
      [name, email, password],
    );
    return res.status(201).json({
      status: true,
      message: "Create User Success",
      data: { id: user.insertId, name, email },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
      error: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, password, is_active } = req.body;
  try {
    if (!password) {
      const [user] = await pool.query(
        "UPDATE user SET name=?, email=?, is_active=? WHERE id=?",
        [name, email, is_active, id],
      );
    } else {
      const [user] = await pool.query(
        "UPDATE user SET name=?, email=?, password=?, is_active=? WHERE id=?",
        [name, email, password, is_active, id],
      );
    }
    return res.status(200).json({
      status: true,
      message: "Update User Success",
      data: USERS,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
      error: error,
    });
  }
};

export const deleteUser = async (req, res) => {
  // untuk update dan delete pasti ada id
  const id = parseInt(req.params.id);
  try {
    const [user] = await pool.query("DELETE FROM user WHERE id=?", [id]);
    return res.status(404).json({
      status: true,
      message: error.message,
      error: error.message,
    });
  } catch (error) {
    return res.status(200).json({
      status: true,
      message: "Delete success",
    });
  }
};
