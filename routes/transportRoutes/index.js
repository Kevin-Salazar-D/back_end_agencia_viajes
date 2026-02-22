import { Router } from "express";

//importamos los middlewares
import verificarJWT  from "../../middlewares/authMiddlewares.js";
import rolesPermitidos from "../../middlewares/rolesPermitidos.js";

const transporteRutas = (transportController) => {
  const router = Router();

    // Rutas GET   
    router.get("/obtenerTodosTransportes", transportController.mostrarTodosTransportes);
    router.get("/buscarTransportePorId", transportController.buscarTransportePorId);
    router.get("/buscarTransportePorTipo", transportController.buscarTransportePorTipo);

    // Rutas POST
    router.post("/crearTransporte", verificarJWT, rolesPermitidos(["admin"]), transportController.crearTransporte);
    // Rutas PUT
    router.put("/actualizarTransporte", verificarJWT, rolesPermitidos(["admin"]), transportController.actualizarTransporte);  
    // Rutas DELETE
    router.delete("/eliminarTransporte", verificarJWT, rolesPermitidos(["admin"]), transportController.borrarTransporte);
    return router;
};

export default transporteRutas;