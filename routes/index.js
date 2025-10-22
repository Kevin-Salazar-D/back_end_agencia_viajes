import { Router } from "express";
import usuarioRutasFactory from "./userRoutes/index.js";
import ciudadRutasFactory from "./cityRoutes/index.js";
import hotelRutasFactory from "./hotelRoutes/index.js";
import roomRutasFactory from "./roomRoutes/index.js";
import transportFactory from "./transportRoutes/index.js";

const router = Router();




export default router;
export { 
    usuarioRutasFactory, 
    ciudadRutasFactory,
    hotelRutasFactory,
    roomRutasFactory,
    transportFactory
}; 
