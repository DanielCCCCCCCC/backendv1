import { Router } from "express";
import {
  login,
  register,
  logout,
  infoUsers,
  RefreshToken,
} from "../controllers/auth.controllers.js";

//import { body } from "express-validator";: Esta línea importa una función llamada body
//que se usa para validar datos que vienen en las solicitudes
//(por ejemplo, comprobar si el correo electrónico tiene un formato correcto).
//Sino salen bien las validaciones, se ejecuta el segundo parametro, que seria el mensaje de error
import { body } from "express-validator";

// Importación de middlewares: Se importan funciones de otros archivos que ayudan a
// validar resultados (validationResultExpress)
// y a requerir un token para acceder a ciertas rutas (requiereToken).
import { validationResultExpress } from "../middlewares/validationResultExpress.js";
import { requiereToken } from "../middlewares/requiereToken.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";
import {
  bodyLoginValidator,
  bodyRegisterValidator,
} from "../middlewares/validatorManager.js";

// const router = Router();:
// Aquí se crea un nuevo enrutador. Este enrutador manejará las rutas definidas más adelante.
const router = Router();

// router.post("/login", ...):
// Esto define una nueva ruta que responde a solicitudes POST
// (cuando alguien envía datos, como un formulario) en la URL /login
router.post(
  "/login",
  bodyLoginValidator,
  login // Se llama a la funcion "login" en auth.controllers, cuando se pasan todas las validaciones
);

router.post(
  "/register",
  bodyRegisterValidator,
  register // Se llama a la funcion "register" en auth.controllers, cuando se pasan todas las validaciones
);

router.get("/protected", requiereToken, infoUsers); // rutas protegidas, requireToken da acceso a los usuarios validados a la informacion protegida
router.get("/refresh", requireRefreshToken, RefreshToken);
router.get("/logout", logout);
export default router;
