import { id, tr } from "zod/locales";
import pool from "../config/db.js";
import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import { email } from "zod";

// CRUD (Create, Read, Update, Delete)
export const getAllUser = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        updated_at: true,
      },
      orderBy: { id: "desc" },
    });

    return res.status(200).json({
      status: true,
      message: "Fetch user success",
      total: users.length,
      data: users,
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
  // const [user] = await pool.query(
  //   "SELECT id, name, email, is_active FROM user WHERE id=?",
  //   [id],
  // );
  const users = await prisma.user.findUnique({
    where: { id: id },
  });
  if (users.length === 0) {
    return res.status(404).json({
      status: false,
      message: "User Not Found",
    });
  }
  return res.status(200).json({
    status: true,
    message: "User success",
    data: users,
  });
};

export const createUser = async (req, res) => {
  // const { name, email, password } = req.body;
  try {
    // const [user] = await pool.query(
    //   "INSERT INTO user(name, email, password) VALUES (?, ?, ?)",
    //   [name, email, password],
    // );
    const users = await prisma.user.findFirst({
      data: {
        id,
        name,
        email,
        password,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return res.status(201).json({
      status: true,
      message: "Create User Success",
      data: { id: users.insertId, name, email },
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
  let update = "";
  const dataUpdate = {};
  if (email) dataUpdate.email = email;
  if (name) dataUpdate.name = name;

  try {
    if (password) {
      dataUpdate.password = await bcrypt.hash(password, 10);
    }
    const user = await prisma.user.update({
      where: { id: id },
      data: dataUpdate,
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        updated_at: true,
      },
    });
    return res.status(200).json({
      status: true,
      message: "Update User Success",
      data: user,
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
    // const [user] = await pool.query("DELETE FROM user WHERE id=?", [id]);
    await prisma.user.delete({ where: { id: id } });
    return res.status(200).json({
      status: true,
      message: "Delete user success",
    });
  } catch (error) {
    return res.status(404).json({
      status: true,
      message: error.message,
      error: error.message,
    });
  }
};
