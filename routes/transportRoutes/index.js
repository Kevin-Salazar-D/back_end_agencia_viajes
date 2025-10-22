import { Router } from "express";

const transporteRutas = (transportController) => {
  const router = Router();

    // Rutas GET   
    router.get("/obtenerTodosTransportes", transportController.mostrarTodosTransportes);
    router.get("/buscarTransportePorId", transportController.buscarTransportePorId);
    router.get("/buscarTransportePorTipo", transportController.buscarTransportePorTipo);

    // Rutas POST
    router.post("/crearTransporte", transportController.crearTransporte);
    // Rutas PUT
    router.put("/actualizarTransporte", transportController.actualizarTransporte);  
    // Rutas DELETE
    router.delete("/eliminarTransporte", transportController.borrarTransporte);
    return router;
};

export default transporteRutas;