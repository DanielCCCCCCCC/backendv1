import axios from "axios";
import { validationResult } from "express-validator";
import { body, param } from "express-validator";

export const validationResultExpress = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const paramLinkValidator = [
  param("id", "Formato no valido (express-validator)")
    .trim()
    .notEmpty()
    .escape(),
  validationResultExpress,
];

export const bodyRegisterValidator = [
  body("email", "Formmato de E-mail incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),

  body("password", "Minimo 6 caracteres").trim().isLength({ min: 6 }),

  body("password", "Formato de password incorrecto").custom(
    (value, { req }) => {
      //Value:  Es el valor actual del campo password que se está validando. Es el que el usuario ha introducido.
      // req: Es un objeto que contiene la solicitud (request). A través de req, puedes acceder a otros campos que el usuario envió en la solicitud, como el campo repassword (confirmación de contraseña).
      if (value !== req.body.repassword) {
        //Accede al valor del campo repassword que también debe haberse enviado en la solicitud. Este es el campo donde el usuario repite su contraseña.
        throw new Error("No coinciden las contraseñas");
      }
      return value; //si las password son iguales, devuelve el valor de la actual contraseña y pasa a la siguiente
    }
  ),

  validationResultExpress, //Este es un middleware que verifica si las validaciones anteriores han pasado.
  //Si hay errores, detiene el proceso y envía los errores al cliente.
];

export const bodyLinkValidatior = [
  body("longLink", "FORMATO DEL LINK NO VALIDO")
    .trim()
    .notEmpty()
    .custom(async (value) => {
      try {
        // if (!value.startsWith("http://")) {
        //   value = "https://" + value;
        // }
        // console.log("LN46: " + value);

        await axios.get(value);
        return value;
      } catch (e) {
        console.log(e.message);
        throw new Error("Not Found LongLink 404");
      }
    }),
  validationResultExpress,
];

export const bodyLoginValidator = [
  [
    //email, es del input del formulario, type="email"
    body("email", "Formato de E-mail incorrecto")
      .trim() //Elimina los espacios al inicio y final
      .isEmail() // Comprueba que sea un email correcto
      .normalizeEmail(), //Normaliza el email para evitar variaciones.

    body("password", "Minimo 6 caracteres") //Valida que la contraseña tenga al menos 6 caracteres.
      .trim() // elimina los espacios al inicio y final
      .isLength({ min: 6 }), // establece la condicion de minimo 6 caracteres
  ],
  validationResultExpress, //Este es un middleware que verifica si las validaciones anteriores han pasado.
  //Si hay errores, detiene el proceso y envía los errores al cliente.
];
