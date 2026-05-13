import { Router } from "express";

//llamamos al middelwere para verificar el tokken
import verificarTokem from "../../middlewares/authMiddlewares.js";

const authRoutes = (authController) => {
  const router = Router();

    // Rutas POST
    router.post("/registro", authController.login);
    router.post("/crearCuenta", authController.crearCuenta); 
    router.post("/verificarAuth2FA", authController.verificarAuth2FA); 


    //ruta protegida
    router.post("/cerrarSesion", verificarTokem, authController.logout);
    router.post("/activarDosPasos", verificarTokem, authController.activarDosPasos); 
    router.post("/confirmarDosPasos", verificarTokem, authController.confirmarDosPasos); 
    router.get("/perfil", verificarTokem, authController.perfil); 

    return router;
};

export default authRoutes;