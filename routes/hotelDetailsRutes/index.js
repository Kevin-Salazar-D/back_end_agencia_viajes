import { Router } from "express";

const hotelesDetallesRutas = (detallesHotelesControlador) => {
  const router = Router();

  // GET: mostrar todos los detalles
  router.get(
    "/mostrarTodosDetallesHoteles",
    detallesHotelesControlador.mostrarTodosDetallesHoteles
  );

  // GET: mostrar detalles de un hotel
  router.get(
  "/mostrarDetallesDeUnHotel/:hotel_id",
  detallesHotelesControlador.mostrarDetallesDeUnHotel
);

  // POST: crear detalles del hotel
  router.post(
    "/crearDetallesHotel",
    detallesHotelesControlador.crearDetallesHoteles
  );

  // PUT: actualizar detalles
  router.put(
    "/actualizarDetallesHotel",
    detallesHotelesControlador.actualizarDetallesHotel
  );

  // DELETE: borrar detalle
  router.delete(
    "/borrarDetalleHotel",
    detallesHotelesControlador.borrarDetalleHotel
  );

  return router;
};

export default hotelesDetallesRutas;
