import { Router } from "express";

const viajeRutas = (viajeControlador) => {
  const router = Router();

  // GET: mostrar todos los viajes
  router.get(
    "/mostrarTodosLosViajes",
    viajeControlador.mostrarTodosLosViajes
  );

  // GET: mostrar viaje por ID
  router.get(
    "/mostrarViaje/:id",
    viajeControlador.mostrarViajeID
  );

  // GET: mostrar viaje filtrado por ciudad origen y destino
  router.get(
    "/mostrarFiltroViaje/:ciudad_origen/:ciudad_destino",
    viajeControlador.mostrarFiltroViaje
  );

  // POST: crear viaje
  router.post(
    "/crearViaje",
    viajeControlador.crearViaje
  );

  // PUT: actualizar viaje
  router.put(
    "/actualizarViaje",
    viajeControlador.actualizarViaje
  );

  // DELETE: borrar viaje
  router.delete(
    "/borrarViaje",
    viajeControlador.borrarViaje
  );

  return router;
};

export default viajeRutas;
