import { Router } from "express";

//importamos los middlewares
import verificarJWT  from "../../middlewares/authMiddlewares.js";
import rolesPermitidos from "../../middlewares/rolesPermitidos.js";

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
    verificarJWT,
    rolesPermitidos(["admin"]),
    detallesHotelesControlador.crearDetallesHoteles
  );

  // PUT: actualizar detalles
  router.put(
    "/actualizarDetallesHotel",
    verificarJWT,
    rolesPermitidos(["admin"]),
    detallesHotelesControlador.actualizarDetallesHotel
  );

  // DELETE: borrar detalle
  router.delete(
    "/borrarDetalleHotel",
    verificarJWT,
    rolesPermitidos(["admin"]),
    detallesHotelesControlador.borrarDetalleHotel
  );

  return router;
};

export default hotelesDetallesRutas;
