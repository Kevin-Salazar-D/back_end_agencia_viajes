
import { Router } from "express";

const reservacionRutas = (reservacionControlador) => {
  const router = Router();

  // GET: mostrar todas las reservaciones
  router.get("/mostrarTodasReservaciones", reservacionControlador.mostrarTodasReservaciones);

  // GET: mostrar reservacion por numero_reserva
  router.get("/mostrarReservacion/:numero_reserva", reservacionControlador.mostrarReservacion);

  // POST: crear una reservacion
  router.post("/crearReservacion", reservacionControlador.crearReservacion);

  // PUT: actualizar una reservacion
  router.put("/actualizarReservacion", reservacionControlador.actualizarReservacion);

  // DELETE: borrar una reservacion
  router.delete("/borrarReservacion", reservacionControlador.borrarReservacion);

  return router;
};

export default reservacionRutas;
