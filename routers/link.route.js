import { Router } from "express";
import {
  createLink,
  getLink,
  getLinks,
  removeLink,
  updateLink,
} from "../controllers/link.controllers.js";
import { requiereToken } from "../middlewares/requiereToken.js";
import {
  bodyLinkValidatior,
  paramLinkValidator,
} from "../middlewares/validatorManager.js";
const router = new Router();

//Get: /api/v1/links            Para traerse todas las URL
//Gert /api/v1/links/:id        Solo una link del usuario autentificado
//POST /api/v1/links            Crear una url
//PATCH/PUT  /api/v1/links/:id  Update link
//DELETE /api/v1/links/:id      Elimina un link

router.get("/", requiereToken, getLinks);
router.get("/:nanoLink", getLink);
router.post("/", requiereToken, bodyLinkValidatior, createLink);
router.delete("/:id", requiereToken, paramLinkValidator, removeLink);
router.patch("/:id", requiereToken, paramLinkValidator, bodyLinkValidatior, updateLink);
  
export default router;
