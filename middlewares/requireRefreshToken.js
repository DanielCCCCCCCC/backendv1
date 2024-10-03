import { tokenVerificationError } from "../utils/generateToken.js";
import JWT from "jsonwebtoken";
export const requireRefreshToken = (req, res, next) => {
  try {
    const refreshTokenCookie = req.cookies.refreshToken;
    if (!refreshTokenCookie) throw new Error("No existe el token");

    const { uid } = JWT.verify(refreshTokenCookie, process.env.JWT_REFRESH);
    req.uid = uid;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: tokenVerificationError[error.mensage] });
  }
};
