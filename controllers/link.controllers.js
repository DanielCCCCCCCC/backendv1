import { Link } from "../models/Link.js";
import { nanoid } from "nanoid"; // Asegúrate de importar nanoid
import mongoose from "mongoose";

export const getLinks = async (req, res) => {
  try {
    const links = await Link.find({ uid: req.uid });
    console.log(links);
    return res.json({ links });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error de servidor" });
  }
};

export const getLink = async (req, res) => {
  try {
    const { nanoLink } = req.params;
    const link = await Link.findOne({nanoLink});
    if (!link) {
      return res.status(404).json({ error: "Link no existe" });
    }

    console.log("Linea 58 GetLink: " + link);
    return res.json({ longLink: link.longLink });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(403).json({ error: "Formato ID incorrecto" });
    }
    return res.status(500).json({ error: "Error de servidor" });
  }
};

////////////////////////////////////////////////////////////////

export const getLinkCrud = async (req, res) => {
  try {
    const { id } = req.params;
    const link = await Link.findById(id);
    if (!link) {
      return res.status(404).json({ error: "Link no existe" });
    }

    if (!link.uid.equals(req.uid)) {
      return res.status(401).json({ error: "No le pertenece ese Id 🤡" });
    }

    console.log("Linea 58 GetLink: " + link);
    return res.json({ link });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(403).json({ error: "Formato ID incorrecto" });
    }
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const removeLink = async (req, res) => {
  try {
    const { id } = req.params;
    const link = await Link.findById(id);
    if (!link) {
      return res.status(404).json({ error: "Link no existe" });
    }

    if (!link.uid.equals(req.uid)) {
      return res.status(401).json({ error: "No le pertenece ese Id 🤡" });
    }
    console.log("Linea 58 GetLink: " + link);

    await Link.findByIdAndDelete(id);

    return res.json({ link });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(403).json({ error: "Formato ID incorrecto" });
    }
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const createLink = async (req, res) => {
  try {
    let { longLink } = req.body;
    const link = new Link({
      longLink: longLink,
      nanoLink: nanoid(6),
      uid: req.uid,
    });

    const newLink = await link.save();

    return res.status(201).json({ newLink });
  } catch (e) {
    console.error("Error al crear el link:", e);
    return res.status(500).json({ error: e.message });
  }
};

export const updateLink = async (req, res) => {
  try {
    const { id } = req.params;
    const { longLink } = req.body;
    const link = await Link.findById(id);
    if (!link) {
      return res.status(404).json({ error: "Link no existe" });
    }

    if (!link.uid.equals(req.uid)) {
      return res.status(401).json({ error: "No le pertenece ese Id 🤡" });
    }
    console.log("Linea 92 updateLink: " + link);

    //Actualizar
    link.longLink = longLink;
    await link.save();

    return res.json({ link });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(403).json({ error: "Formato ID incorrecto" });
    }
    return res.status(500).json({ error: "Error de servidor" });
  }
};
