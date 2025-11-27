import validarDatos from "../../utils/validarDatos.js";
import validarFilaAfectada from "../../utils/validarFilaAfectada.js";
import validarLista from "../../utils/validarLista.js";

const ViajeServicio = (modeloViaje) => {
  return {
    // Crear un viaje
    crearViaje: async (viajeData) => {
      validarDatos(viajeData, "Faltaron campos para la creación del viaje");
      return await modeloViaje.crearViaje(viajeData);
    },

    // Actualizar un viaje completo
    actualizarViaje: async (viajeData) => {
      validarDatos(viajeData, "Faltaron campos para actualizar el viaje");

      const filasAfectadas = await modeloViaje.actualizarViaje(viajeData);

      validarFilaAfectada(
        filasAfectadas,
        "No se encontró el viaje para actualizar"
      );

      return filasAfectadas;
    },

    // Mostrar viajes filtrados por ciudad origen y destino
    mostrarFiltroViaje: async (ciudad_origen, ciudad_destino) => {
      validarDatos(
        { ciudad_origen, ciudad_destino },
        "Faltaron datos para hacer el filtro de viajes"
      );

      const viajesFiltrados = await modeloViaje.mostrarFiltroViaje(
        ciudad_origen,
        ciudad_destino
      );

      validarLista(
        viajesFiltrados,
        "No se encontró ningún viaje por el momento"
      );

      return viajesFiltrados;
    },

    // Mostrar viaje por ID
    mostrarViajeID: async (id) => {
      validarDatos(id, "Faltó el ID para mostrar el viaje");
      const viaje = await modeloViaje.mostrarViajeID(id);

      validarLista([viaje], "No se encontró el viaje solicitado");

      return viaje;
    },

    // Mostrar todos los viajes
    mostrarTodosLosViajes: async () => {
      const viajes = await modeloViaje.mostrarTodosLosViajes();
      validarLista(viajes, "No se encontraron viajes por el momento");
      return viajes;
    },

    // Borrar viaje
    borrarViaje: async (id) => {
      validarDatos(id, "Faltó el ID para borrar el viaje");

      const filasAfectadas = await modeloViaje.borrarViaje(id);

      validarFilaAfectada(filasAfectadas, "No se encontró el viaje a borrar");

      return filasAfectadas;
    },
  };
};

export default ViajeServicio;
