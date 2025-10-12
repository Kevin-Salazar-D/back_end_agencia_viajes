import { Router } from "express";
import usuarioRutasFactory from "./userRoutes/index.js"; // ← ruta relativa a la carpeta userRoutes

const router = Router();



export default router;
export { usuarioRutasFactory }; 
