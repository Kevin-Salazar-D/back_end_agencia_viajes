import { Router } from "express";
import usuarioRutasFactory from "./userRoutes/index.js";
import ciudadRutasFactory from "./cityRoutes/index.js";

const router = Router();




export default router;
export { usuarioRutasFactory, ciudadRutasFactory }; 
