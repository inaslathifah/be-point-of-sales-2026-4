import pool from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  // find()
  // const user = USERS.find((u) => u.email === email && u.password === password);
  try {
    const users = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!users) {
      return res.status(401).json({
        status: false,
        message: "Invalid Credential",
      });
    }
    const isMatch = await bcrypt.compare(password, users.password);
    if (!isMatch) {
      // 401: unauthorize (login gagal)
      return res.status(401).json({
        status: false,
        message: "Invalid Credential",
      });
    }

    const token = jwt.sign(
      {
        id: users.id,
        name: users.name,
        email: users.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" },
    );

    res.status(200).json({
      status: true,
      message: "Login Success",
      data: {
        user: {
          id: users.id,
          name: users.name,
          email: users.email,
        },
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const me = async (req, res) => {
  try {
    const userId = req.user.id;
    const users = await prisma.users.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
      },
    });
    return res.status(200).json({
      status: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
      error: error.message,
    });
  }
};
