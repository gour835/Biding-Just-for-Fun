import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import UserModel from "../models/UserModel.js";
import Transport from "../config/NodeMailer.js";

export async function token(req, res) {
  try {
    const user = req.user.id;
    if (!user) {
      return res.status(400).json({ success: false });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function register(req, res) {
  //checking the required fields in request obj
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({
      success: false,
      message: "Missing Required Fields",
    });
  }

  try {
    //checking if user with this email already exists or not
    const ExistingUser = await UserModel.findOne({ email });
    if (ExistingUser) throw new Error("This Email is Already in Use");

    const HashedPassword = await bcrypt.hash(password, 15);

    const User = new UserModel({
      name,
      email,
      password: HashedPassword,
    });

    await User.save();

    const token = jwt.sign({ id: User._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.APP_ENV === "production",
      sameSite: process.env.APP_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const EmailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "This Email is to verify that the register process is done",
      text: "This Email is to verify that the register process is done",
    };

    await Transport.sendMail(EmailOptions);
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and Password are required" });
  }

  //find the user
  const User = await UserModel.findOne({ email });
  if (!User) {
    return res.status(401).json({ success: false, message: "Invalid Email" });
  }

  //check the password
  const compare = await bcrypt.compare(password, User.password);

  if (!compare) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid Password" });
  }

  const token = jwt.sign({ id: User._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return res.status(200).json({ success: true });
}

export async function logout(req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });
    return res.status(200).json({ success: true, message: "User Logged out Successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}
