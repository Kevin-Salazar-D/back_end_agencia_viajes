import validarDatos from "../../utils/validarDatos.js";

const hotelServicio = (modeloHotel) => {
  return {
    // Crear hotel
    crearHotel: (hotelData) => {
      validarDatos(hotelData, "Faltaron campos para la creación del hotel");
      return modeloHotel.crearHotel(hotelData);
    },

    // Actualizar hotel
    actualizarHotel: (hotelData) => {
      validarDatos(hotelData, "Faltaron campos para actualizar el hotel");
      return modeloHotel.actualizarHotel(hotelData);
    },

    // Actualizar solo la ciudad del hotel
    actualizarCiudadIdHotel: (hotelData) => {
      validarDatos(hotelData, "Faltaron datos para actualizar la ciudad del hotel");
      const filasAfectadas = modeloHotel.actualizarCiudadIdHotel(hotelData);
      if (filasAfectadas === 0) throw new Error("No se encontró ningúna ciudad  con el ID proporcionado");

      return filasAfectadas;
    },

    // Mostrar todos los hoteles
    mostrarTodosHoteles: () => {
      return modeloHotel.mostrarTodosHoteles();
    },

    // Mostrar hoteles por ciudad
    mostrarHotelesCiudad: (hotelData) => {
      validarDatos(hotelData, "Faltaron datos para mostrar los hoteles por ciudad");
      const hoteles = modeloHotel.mostrarHotelesCiudad(hotelData);
      if (!hoteles || hoteles.length === 0) throw new Error("No se encontraron hoteles para la ciudad proporcionada");
      return hoteles;
    },

    // Borrar un hotel
    borrarHotel: (id) => {
      validarDatos(id, "Faltó el ID para borrar el hotel");
      const filasAfectadas = modeloHotel.borrarHotel(id);
      if (filasAfectadas === 0) throw new Error("No se encontró ningún hotel con el ID proporcionado");
      return filasAfectadas;
    },
  };
};

export default hotelServicio;
