import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserModel } from "../models/user.model.js";

// ================= LOGIN =================
export async function login(email, password) {
  const user = await UserModel.findOne({ email }).select("+password");
  if (!user) throw new Error("Invalid credentials");

  if (user.oAuthProvider !== "local") {
    throw new Error(`Please login using ${user.oAuthProvider}`);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  return generateToken(user);
}

// ================= SIGNUP =================
export async function signup(data) {
  const existing = await UserModel.findOne({ email: data.email });
  if (existing) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await UserModel.create({
    ...data,
    password: hashedPassword,
    oAuthProvider: "local",
  });

  return generateToken(user);
}

// ================= OAUTH LOGIN =================
export async function oauthLogin({ provider, email, name }) {
  let user = await UserModel.findOne({ email });

  if (!user) {
    user = await UserModel.create({
      name: name || email.split("@")[0],
      email,
      role: "user",
      oAuthProvider: provider,
    });
  }

  return generateToken(user);
}

// ================= TOKEN + SAFE USER =================
function generateToken(user) {
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
      name: user.name,
      email: user.email,
      oAuthProvider: user.oAuthProvider,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  // 🔐 REMOVE SENSITIVE FIELDS
  const safeUser = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    oAuthProvider: user.oAuthProvider,
    createdAt: user.createdAt,
  };

  return { token, user: safeUser };
}
