import { Router } from "express";

//importamos los middlewares
import verificarJWT  from "../../middlewares/authMiddlewares.js";
import rolesPermitidos from "../../middlewares/rolesPermitidos.js";

const paqueteRutas = (paqueteControlador) => {
  const router = Router();

  // GET: mostrar todos los paquetes
  router.get( "/mostrarTodosPaquetes", paqueteControlador.mostrarTodosPaquetes );

  router.get("/mostrarPaquete/:id", paqueteControlador.mostrarPaqueteID);

  router.get("/mostrarPaquetesPorHotel/:hotel_id", paqueteControlador.mostrarPaquetesPorHotel);

  // POST: crear paquete
  router.post("/crearPaquete", verificarJWT, rolesPermitidos(["admin", "user"]), paqueteControlador.crearPaquete);

  // PUT: actualizar paquete
  router.put("/actualizarPaquete",  verificarJWT, rolesPermitidos(["admin", "user"]), paqueteControlador.actualizarPaquete );

  // DELETE: borrar paquete
  router.delete("/borrarPaquete",  verificarJWT, rolesPermitidos(["admin"]),paqueteControlador.borrarPaquete);

  return router;
};

export default paqueteRutas;
