import { Router } from "express";


//importamos los middlewares
import verificarJWT  from "../../middlewares/authMiddlewares.js";
import rolesPermitidos from "../../middlewares/rolesPermitidos.js";

const pagosRutas = (pagosControlador) => {
  const router = Router();

  // GET: mostrar todos los pagos (información extendida)
  router.get("/mostrarTodosPagos", verificarJWT, rolesPermitidos(["admin"]), pagosControlador.mostrarTodosPagos);

  // GET: mostrar pago por folio
  router.get("/mostrarPagoPorFolio/:folio", verificarJWT, rolesPermitidos(["admin"]), pagosControlador.mostrarPagoPorFolio);

  // GET: mostrar pago por reservación
  router.get("/mostrarPagoPorReservacion/:reservacion_id", verificarJWT, pagosControlador.mostrarPagoPorReservacion);

  // POST: crear un nuevo pago
  router.post("/crearPago", verificarJWT, pagosControlador.crearPago);

  // PUT: actualizar un pago por folio
  router.put("/actualizarPago", verificarJWT, pagosControlador.actualizarPago);

  // DELETE: borrar pago por ID
  router.delete("/borrarPago", verificarJWT, rolesPermitidos(["admin"]),pagosControlador.borrarPago);

  return router;
};

export default pagosRutas;
