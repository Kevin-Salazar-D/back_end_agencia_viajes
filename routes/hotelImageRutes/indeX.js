import { Router } from "express";

import verificarJWT  from "../../middlewares/authMiddlewares.js";
import rolesPermitidos from "../../middlewares/rolesPermitidos.js";

const hotelesImagenesRutas = (imagenesHotelControlador) => {
  const router = Router();

  // GET: mostrar todas las imagenes de un hotek
  router.get(
    "/mostrarImagenHotel",
    imagenesHotelControlador.mostrarImagenesHotel
  );
  // POST: crear imagenes del hotel
  router.post(
    "/crearImagenHotel",
    verificarJWT,
    rolesPermitidos(["admin"]),
    imagenesHotelControlador.crearImagenHotel
  );

  // PUT: actualizar detalles
  router.put(
    "/actualizarImagenHotel",
    verificarJWT,
    rolesPermitidos(["admin"]),
    imagenesHotelControlador.actualizarImagenHotel
  );

  // DELETE: borrar detalle
  router.delete(
    "/borrarImagenHotel",
    verificarJWT,
    rolesPermitidos(["admin"]),
    imagenesHotelControlador.borrarImagenHotel
  );

  return router;
};

export default hotelesImagenesRutas;
