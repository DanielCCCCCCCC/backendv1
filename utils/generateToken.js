import jwt from "jsonwebtoken";

export const generateToken = (uid) => {
  const expiresIn = 60 * 15;
  try {
    const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn });
    return { token, expiresIn };
  } catch (e) {
    console.log(e);
  }
};

export const generateRefreshToken = (uid, res) => {
  const expiresIn = 60 * 60 * 24 * 30;
  try {
    const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, {
      expiresIn,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.MODO !== "developer", // Solo para producción
      expires: new Date(Date.now() + expiresIn * 1000),
      sameSite: "Strict", // Puede ser Lax o None según las necesidades
    });
  } catch (e) {
    console.log(e);
  }
};

 export const tokenVerificationError = {
   "invalid signature": "La firma del JWT no es valida",
   "jwt expired": "JWT expirado",
   "invalid signature": "Token no valido",
   "No bearer": "Utiliza formato Bearer",
   "jwt malformed": "jWT formato no valido",
 };
