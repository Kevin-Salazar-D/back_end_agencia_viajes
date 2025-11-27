import { Router } from "express";

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
    imagenesHotelControlador.crearImagenHotel
  );

  // PUT: actualizar detalles
  router.put(
    "/actualizarImagenHotel",
    imagenesHotelControlador.actualizarImagenHotel
  );

  // DELETE: borrar detalle
  router.delete(
    "/borrarImagenHotel",
    imagenesHotelControlador.borrarImagenHotel
  );

  return router;
};

export default hotelesImagenesRutas;
