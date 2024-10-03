import "dotenv/config";
import "./database/connectdb.js";
import cookieParser from "cookie-parser";

import express from "express"; //   funciona siempre y cuando tengamos en el package.json el
//   type: 'module'
import authRouter from "./routers/auth.route.js";
import linkRouter from "./routers/link.route.js";
import redirectRouter from "./routers/redirect.route.js";
import cors from "cors";

const app = express();
const whiteList = [process.env.ORIGIN1];

//El cors revisa el dominio que esta accediendo a la app, si esta en la variable de entorno ORIGIN1
//se le da acceso, sino salta un error de seguridad
app.use(
  cors({
    origin: function (origin, callback) {
      if (whiteList.includes(origin)) {
        return callback(null, origin);
      }
      return callback("Error de CORS Origin: " + origin + " No autorizado");
    },
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/links", linkRouter);

//Ejemplo back redirect (opcional)
app.use("/", redirectRouter);
//solo para el ejemplo del login y token
app.use(express.static("public"));

const PORT = process.env.PORT || 5000;

app.listen(5000, () => console.log("❤️❤️❤️ http://localhost:5000 " + PORT));
