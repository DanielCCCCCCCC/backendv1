// Los controladres hacen la solicitud a la base da datos en MONGO

import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import { generateRefreshToken, generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    //Alternativa buscando por email
    let user = await User.findOne({ email: email });
    if (user) throw { code: 11000 };
    user = new User({ email: email, password: password });
    await user.save();

    //Generar jwt token
    const { token, expiresIn } = generateToken(user.id);
    generateRefreshToken(user.id, res);

    return res.status(201).json({ token, expiresIn });
  } catch (e) {
    console.log(e.code);
    //alternativa por defecto mongoose
    if (e.code === 11000) {
      return res.status(400).json({ ERROR: "Ya existe este usuario" });
    }
  }

  res.json({ ok: "Register" });
};

export const login = async (req, res) => {
  console.log("Entro aqui === ???");
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (!user) return res.status(403).json({ ERROR: "No existe este usuario" });
    const respuestaPassword = await user.comparePassword(password);
    if (!respuestaPassword)
      return res.status(403).json({ ERROR: "Contraseña incorrecta" });

    // generar token
    console.log(user.id);
    const { token, expiresIn } = generateToken(user.id);
    generateRefreshToken(user.id, res);

    return res.json({ token, expiresIn });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ ERROR: "Error de servidor" });
  }
};

export const infoUsers = async (req, res) => {
  try {
    const user = await User.findById(req.uid).lean();
    return res.json({ email: user.email });
  } catch (e) {
    return res.status(500).json({ ERROR: "Error de servidor" });
  }
};

export const RefreshToken = async (req, res) => {
  try {
    const { token, expiresIn } = generateToken(req.uid);
    return res.json({ token, expiresIn });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ ERROR: "Error de servidor" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ ok: true });
};
