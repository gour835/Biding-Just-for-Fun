import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";

//middlewares
//# 1) Protected Routes
export function authenticateToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    req.user = decoded;
    next();
  });
}

export async function FindUser(req, res, next) {
  try {
    const userId = req.user.id;
    const user = await UserModel.find({ userId });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User Not Found!" });
    }
    req.userDetails = user;
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
