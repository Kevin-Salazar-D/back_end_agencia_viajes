import validarDatos from "../../utils/validarDatos.js";
import validarFilaAfectada from "../../utils/validarFilaAfectada.js";
import transformarLista from "../../utils/trasformarLista.js";

const detallesHotelesServicio = (modelDetalles) => {
  return {

    // Crear detalles del hotel
    crearDetallesHoteles: async (hotelData) => {
      validarDatos(hotelData, "Faltaron campos para la creación del hotel");
      return await modelDetalles.crearDetallesHoteles(hotelData);
    },

    // Actualizar detalles completos
    actualizarDetallesHotel: async (hotelData) => {
      validarDatos(hotelData, "Faltaron campos para actualizar el hotel");

      const filasAfectadas = await modelDetalles.actualizarDetallesHotel(hotelData);
      validarFilaAfectada(
        filasAfectadas,
        "No se encontró el hotel para actualizar"
      );

      return filasAfectadas;
    },

    // Mostrar todos los detalles de hoteles
    mostrarTodosDetallesHoteles: async () => {
      const detallesHoteles = await modelDetalles.mostrarTodosDetallesHoteles();
      const infoTrasformar = ["amenidades", "politicas"];
      const infoTraformada = transformarLista(detallesHoteles, infoTrasformar);

      return infoTraformada;
    },

    // Mostrar detalles de un hotel
    mostrarDetallesDeUnHotel: async (hotel_id) => {
      validarDatos(hotel_id, "Faltó el ID para mostrar los detalles del hotel");
      const detallesHotel = await modelDetalles.mostrarDetallesDeUnHotel(hotel_id);
      const infoTrasformar = ["amenidades", "politicas"];
      const infoTraformada = transformarLista(detallesHotel, infoTrasformar);
      return infoTraformada;
    },

    // Borrar detalle del hotel
    borrarDetalleHotel: async (id) => {
      validarDatos(id, "Faltó el ID para borrar el detalle del hotel");
      const filasAfectadas = await modelDetalles.borrarDetalleHotel(id);
      validarFilaAfectada(
        filasAfectadas,
        "No se encontró el ID del detalle para borrar"
      );

      return filasAfectadas;
    },
  };
};

export default detallesHotelesServicio;
