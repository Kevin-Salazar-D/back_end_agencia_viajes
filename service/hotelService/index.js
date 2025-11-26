import validarDatos from "../../utils/validarDatos.js";
import validarFilaAfectada from "../../utils/validarFilaAfectada.js";

const hotelServicio = (modeloHotel) => {
  return {
    // Crear hotel
    crearHotel: async (hotelData) => {
      validarDatos(hotelData, "Faltaron campos para la creación del hotel");
      return await modeloHotel.crearHotel(hotelData);
    },

    // Actualizar hotel completo
    actualizarHotel: async (hotelData) => {
      validarDatos(hotelData, "Faltaron campos para actualizar el hotel");

      const filasAfectadas = await modeloHotel.actualizarHotel(hotelData);

      validarFilaAfectada(
        filasAfectadas,
        "No se encontró el hotel para actualizar"
      );

      return filasAfectadas;
    },

    // Actualizar solo ciudad del hotel
    actualizarCiudadIdHotel: async (data) => {
      validarDatos(data, "Faltaron datos para actualizar la ciudad del hotel");

      const filasAfectadas = await modeloHotel.actualizarCiudadIdHotel(data);

      validarFilaAfectada(
        filasAfectadas,
        "No se encontró ningún hotel con el ID proporcionado"
      );

      return filasAfectadas;
    },

    // Mostrar todos los hoteles
    mostrarTodosHoteles: async () => {
      return await modeloHotel.mostrarTodosHoteles();
    },

    // Mostrar hoteles por ciudad
    mostrarHotelesCiudad: async (cityData) => {
      validarDatos(
        cityData,
        "Faltaron datos para mostrar los hoteles por ciudad"
      );

      const hoteles = await modeloHotel.mostrarHotelesCiudad(cityData);

      if (!hoteles || hoteles.length === 0) {
        const error = new Error(
          "No se encontraron hoteles para la ciudad proporcionada"
        );
        error.status = 404;
        throw error;
      }

      return hoteles;
    },

    // Borrar hotel
    borrarHotel: async (id) => {
      validarDatos(id, "Faltó el ID para borrar el hotel");

      const filasAfectadas = await modeloHotel.borrarHotel(id);

      validarFilaAfectada(filasAfectadas, "No se encontró el hotel a borrar");

      return filasAfectadas;
    },
  };
};

export default hotelServicio;
