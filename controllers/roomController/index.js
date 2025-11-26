const habitacionControlador = (servicio) => {
  /**
   * Crear una nueva habitación
   */
  const crearHabitacion = async (req, res) => {
    try {
      const { hotel_id, numero_habitacion, tipo_habitacion } = req.body;

      const nuevaHabitacion = {
        hotel_id,
        numero_habitacion,
        tipo_habitacion,
      };

      const insertId = await servicio.crearHabitacion(nuevaHabitacion);

      res.status(201).json({
        message: "Habitación creada exitosamente",
        habitacionID: insertId,
      });
    } catch (error) {
      res.status(error.status || 500).json({
        error: error.message,
      });
    }
  };

  /**
   * Actualizar habitación completa
   */
  const actualizarHabitacion = async (req, res) => {
    try {
      const { numero_habitacion, tipo_habitacion, estatus, id } = req.body;

      const datosActualizar = {
        numero_habitacion,
        tipo_habitacion,
        estatus,
        id,
      };

      const affected = await servicio.actualizarHabitacion(datosActualizar);

      res.status(200).json({
        message:
          affected === 0
            ? "No se encontró la habitación con ese ID"
            : "Habitación actualizada exitosamente",
        affectedRows: affected,
      });
    } catch (error) {
      res.status(error.status || 500).json({
        error: error.message,
      });
    }
  };

  /**
   * Mover habitación a otro hotel
   */
  const actualizarIdHabitacion = async (req, res) => {
    try {
      const { hotel_id, id } = req.body;

      const datos = { hotel_id, id };

      const affected = await servicio.actualizarIdHabitacion(datos);

      res.status(200).json({
        message:
          affected === 0
            ? "No se encontró la habitación para actualización"
            : "Hotel asociado actualizado correctamente",
        affectedRows: affected,
      });
    } catch (error) {
      res.status(error.status || 500).json({
        error: error.message,
      });
    }
  };

  /**
   * Apartar la habitación (estatus = 1)
   */
  const apartarEstatusHabitacion = async (req, res) => {
    try {
      const { id } = req.body;

      const affected = await servicio.apartarEstatusHabitacion(id);

      res.status(200).json({
        message:
          affected === 0
            ? "No se pudo apartar la habitación"
            : "Habitación apartada correctamente",
        affectedRows: affected,
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  };

  /**
   * Obtener estatus de una habitación
   */
  const mostrarEstatusHabitacion = async (req, res) => {
    try {
      const { id } = req.query;

      const estatus = await servicio.mostrarEstatusHabitacion(id);

      res.status(200).json({ estatus: estatus===0 ?"disponible" : "apartado"  });
    } catch (error) {
      res.status(error.status || 500).json({
        error: error.message,
      });
    }
  };

  /**
   * Mostrar todas las habitaciones
   */
  const mostrarTodasHabitaciones = async (req, res) => {
    try {
      const habitaciones = await servicio.mostrarTodasHabitaciones();

      res.status(200).json(habitaciones);
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  };

  /**
   * Mostrar habitaciones por hotel
   */
  const mostrarHabitacionesPorHotel = async (req, res) => {
    try {
      const { hotel_id } = req.query;

      const habitaciones = await servicio.mostrarHabitacionesPorHotel(hotel_id);

      res.status(200).json(habitaciones);
    } catch (error) {
      res.status(error.status || 500).json({
        error: error.message,
      });
    }
  };

  /**
   * Borrar habitación
   */
  const borrarHabitacion = async (req, res) => {
    try {
      const { id } = req.body;

      const affected = await servicio.borrarHabitacion(id);
      res.status(200).json({
        message:
          affected === 0
            ? "No se encontró la habitación con el ID proporcionado"
            : "Habitación eliminada exitosamente",
        affectedRows: affected,
      });
    } catch (error) {
      res.status(error.status || 500).json({
        error: error.message,
      });
    }
  };

  return {
    crearHabitacion,
    actualizarHabitacion,
    actualizarIdHabitacion,
    apartarEstatusHabitacion,
    mostrarEstatusHabitacion,
    mostrarTodasHabitaciones,
    mostrarHabitacionesPorHotel,
    borrarHabitacion,
  };
};

export default habitacionControlador;
