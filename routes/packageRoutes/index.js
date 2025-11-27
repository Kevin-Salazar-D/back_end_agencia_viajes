import { Router } from "express";

const paqueteRutas = (paqueteControlador) => {
  const router = Router();

  // GET: mostrar todos los paquetes
  router.get( "/mostrarTodosPaquetes", paqueteControlador.mostrarTodosPaquetes );

  router.get("/mostrarPaquete/:id", paqueteControlador.mostrarPaqueteID);

  router.get("/mostrarPaquetesPorHotel/:hotel_id", paqueteControlador.mostrarPaquetesPorHotel);

  // POST: crear paquete
  router.post("/crearPaquete", paqueteControlador.crearPaquete);

  // PUT: actualizar paquete
  router.put("/actualizarPaquete",paqueteControlador.actualizarPaquete );

  // DELETE: borrar paquete
  router.delete("/borrarPaquete",paqueteControlador.borrarPaquete);

  return router;
};

export default paqueteRutas;
