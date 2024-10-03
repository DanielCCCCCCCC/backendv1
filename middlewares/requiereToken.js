import jwt from "jsonwebtoken";
import { tokenVerificationError } from "../utils/generateToken.js";
export const requiereToken = (req, res, next) => {
  try {
    // console.log(req.headers);
    let token = req.headers?.authorization;
    if (!token) throw new Error("No existe el token en el header usa Bearer");

    token = token.split(" ")[1];
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);

    req.uid = uid;
    next();
  } catch (e) {
    console.log(e);

    return res.status(401).send({ e: tokenVerificationError[e.message] });
  }
};
