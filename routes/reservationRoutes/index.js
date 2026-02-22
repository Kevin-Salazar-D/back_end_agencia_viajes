
import { Router } from "express";

//importamos los middlewares
import verificarJWT  from "../../middlewares/authMiddlewares.js";
import rolesPermitidos from "../../middlewares/rolesPermitidos.js";

const reservacionRutas = (reservacionControlador) => {
  const router = Router();

  // GET: mostrar todas las reservaciones
  router.get("/mostrarTodasReservaciones", verificarJWT, rolesPermitidos(["admin"]), reservacionControlador.mostrarTodasReservaciones);

  // GET: mostrar reservacion por numero_reserva
  router.get("/mostrarReservacion/:numero_reserva", verificarJWT, rolesPermitidos(["admin", "user"]), reservacionControlador.mostrarReservacion);

  // POST: crear una reservacion
  router.post("/crearReservacion", verificarJWT, rolesPermitidos(["admin", "user"]), reservacionControlador.crearReservacion);

  // PUT: actualizar una reservacion
  router.put("/actualizarReservacion", verificarJWT, rolesPermitidos(["admin"]), reservacionControlador.actualizarReservacion);

  // DELETE: borrar una reservacion
  router.delete("/borrarReservacion", verificarJWT, rolesPermitidos(["admin"]), reservacionControlador.borrarReservacion);

  return router;
};

export default reservacionRutas;
