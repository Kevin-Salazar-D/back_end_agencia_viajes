import { Router } from "express";

//llamamos al middelwere para verificar el tokken
import verificarTokem from "../../middlewares/authMiddlewares.js";

const authRoutes = (authController) => {
  const router = Router();

    // Rutas POST
    router.post("/registro", authController.login);
    router.post("/crearCuenta", authController.crearCuenta); 
    
    //ruta protegida
    router.post("/cerrarSesion", verificarTokem, authController.logout);
    return router;
};

export default authRoutes;