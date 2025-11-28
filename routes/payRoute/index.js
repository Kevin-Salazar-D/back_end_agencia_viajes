import { Router } from "express";

const pagosRutas = (pagosControlador) => {
  const router = Router();

  // GET: mostrar todos los pagos (información extendida)
  router.get("/mostrarTodosPagos", pagosControlador.mostrarTodosPagos);

  // GET: mostrar pago por folio
  router.get("/mostrarPagoPorFolio/:folio", pagosControlador.mostrarPagoPorFolio);

  // GET: mostrar pago por reservación
  router.get("/mostrarPagoPorReservacion/:reservacion_id", pagosControlador.mostrarPagoPorReservacion);

  // POST: crear un nuevo pago
  router.post("/crearPago", pagosControlador.crearPago);

  // PUT: actualizar un pago por folio
  router.put("/actualizarPago", pagosControlador.actualizarPago);

  // DELETE: borrar pago por ID
  router.delete("/borrarPago", pagosControlador.borrarPago);

  return router;
};

export default pagosRutas;
