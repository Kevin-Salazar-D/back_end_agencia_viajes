import validarDatos from "../../utils/validarDatos.js";

const roomService = (modelo) => {
  return {
    
    // Crear habitación
    crearHabitacion: async (roomData) => {
      validarDatos(roomData, "Faltan datos para crear la habitación");
      const nuevaHabitacion = { ...roomData, estatus: 0 };
      return await modelo.crearHabitacion(nuevaHabitacion);
    },

    // Actualizar habitación
    actualizarHabitacion: async (roomData) => {
      validarDatos(roomData, "Faltan datos para actualizar la habitación");
      return await modelo.actualizarHabitacion(roomData);
    },

    // Cambiar id del hotel asociado
    actualizarIdHabitacion: async (roomData) => {
      validarDatos(roomData, "Falta id o hotel_id para hacer la actualización");
      return await modelo.actualizarIdHabitacion(roomData);
    },

    // Apartar habitación
    apartarEstatusHabitacion: async (id) => {
      const habitacion = { estatus: 1, id };
      validarDatos(habitacion, "Faltan datos para apartar la habitación");
      return await modelo.apartarEstatusHabitacion(habitacion);
    },

    // Mostrar estatus por ID
    mostrarEstatusHabitacion: async (id) => {
      validarDatos(id, "No se proporcionó el ID de la habitación");
      const habitacion = await modelo.mostrarHabitacionID(id);

      if (!habitacion || habitacion.length === 0) {
        throw new Error("No se encontró ninguna habitación asociada");
      }

      return habitacion[0].estatus;
    },

    // Mostrar todas las habitaciones
    mostrarTodasHabitaciones: async () => {
      return await modelo.mostrarTodasHabitaciones();
    },

    // Mostrar habitaciones por hotel
    mostrarHabitacionesPorHotel: async (hotel_id) => {
      validarDatos(hotel_id, "No se proporcionó el ID del hotel");
      const habitaciones = await modelo.mostrarHabitacionesPorHotel(hotel_id);

      if (!habitaciones || habitaciones.length === 0) {
        throw new Error("No se encontraron habitaciones asociadas a ese hotel");
      }

      return habitaciones;
    },

    // Borrar habitación
    borrarHabitacion: async (id) => {
      console.log(id);
      validarDatos(id, "No se proporcionó el ID de la habitación");
      return await modelo.borrarHabitacion(id);
    },
  };
};

export default roomService;
