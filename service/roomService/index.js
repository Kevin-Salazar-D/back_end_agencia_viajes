import validarDatos from "../../utils/validarDatos.js";

// Servicio principal de habitaciones
const roomService = (modelo) => {
  return {
    // Crear habitación
    crearHabitacion: async (roomData) => {
      validarDatos(roomData, "Faltan datos para crear la habitacion");
      const nuevaHabitacion = { ...roomData, estatus: 0 };
      return await modelo.crearHabitacion(nuevaHabitacion);
    },

    // Actualizar datos de una habitación
    actualizarHabitacion: async (roomData) => {
      validarDatos(roomData, "Faltan datos para actualizar la habitacion");
      return await modelo.actualizarHabitacion(roomData);
    },

    // Actualizar id del hotel asociado
    actualizarIdHabitacion: async (roomData) => {
      validarDatos(roomData, "Falta ID o hotel_id para hacer la actualización");
      return await modelo.actualizarIdHabitacion(roomData);
    },

    // Apartar habitación
    apartarEstatusHabitacion: async (id) => {
      const habitacion = { estatus: 1, id };
      validarDatos(habitacion, "Faltan datos para apartar la habitacion");
      const filaAfectada = await modelo.apartarEstatusHabitacion(habitacion);
      return filaAfectada;
    },

    mostrarEstatusHabitacion: async (id) => {
      validarDatos(id, "No se proporcionó el ID de la habitación");
      const habitacion = await modelo.mostrarHabitacionID(id);
      if (!habitacion || habitacion.length === 0) {
        throw new Error("No se encontró ninguna habitación asociada");
      }
      return habitacion[0].estatus; // Devolvemos solo el valor del estatus
    },

    // Mostrar todas las habitaciones
    mostrarTodasHabitaciones: async () => {
      return await modelo.mostrarTodasHabitaciones();
    },

    // Mostrar una habitación por ID
    mostrarHabitacionID: async (id) => {
      validarDatos(id, "No se encontró ningún ID de habitación");
      const habitacion = await modelo.mostrarHabitacionID(id);
      if (!habitacion || habitacion.length === 0) {
        throw new Error("No se encontró ninguna habitación asociada");
      }
      return habitacion;
    },

    // Borrar una habitación
    borrarHabitacion: async (id) => {
      validarDatos(id, "No se encontró ningún ID de habitación");
      return await modelo.borrarHabitacion(id);
    },
  };
};

export default roomService;
