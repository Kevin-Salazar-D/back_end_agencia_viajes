// Controlador de habitaciones
const habitacionControlador = (servicio) => {
  // Crear una nueva habitación
  const crearHabitacion = async (req, res) => {
    try {
      const { hotel_id, numero_habitacion, tipo_habitacion } = req.body;
      const nuevaHabitacion = {
        hotel_id,
        numero_habitacion,
        tipo_habitacion
      };
      const resultado = await servicio.crearHabitacion(nuevaHabitacion);
      res.status(201).json({
        message: "Habitación creada exitosamente",
        habitacionID: resultado.insertId || resultado,
      });
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  // Actualizar una habitación
  const actualizarHabitacion = async (req, res) => {
    try {
      const { numero_habitacion, tipo_habitacion, estatus, id } = req.body;
      const actualizarHabitacion = {
        numero_habitacion,
        tipo_habitacion,
        estatus,
        id,
      };
      const resultado = await servicio.actualizarHabitacion(actualizarHabitacion);
      res.status(200).json({
        message: "Habitación actualizada exitosamente",
        affectedRows: resultado.affectedRows || resultado,
      });
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  // Actualizar el hotel_id asociado
  const actualizarIdHabitacion = async (req, res) => {
    try {
      const { hotel_id, id } = req.body;
      const actualizarIDHabitacion = { hotel_id, id };
      const resultado = await servicio.actualizarIdHabitacion(actualizarIDHabitacion);
      res.status(200).json({
        affectedRows: resultado.affectedRows || resultado,
      });
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  // Apartar una habitación (cambia estatus a 1)
  const apartarEstatusHabitacion = async (req, res) => {
    try {
      const { id } = req.body;
      const filaAfectada = await servicio.apartarEstatusHabitacion(id);
      const mensaje =
        filaAfectada == 0
          ? "No se apartó la habitación"
          : "Se apartó correctamente la habitación";
      res.status(200).json({ mensaje });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Mostrar el estatus de una habitación
  const mostrarEstatusHabitacion = async (req, res) => {
    try {
      const { id } = req.query;
      const estatusHabitacion = await servicio.mostrarEstatusHabitacion(id);
      res.status(200).json({ estatus: estatusHabitacion });
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  // Mostrar todas las habitaciones
  const mostrarTodasHabitaciones = async (req, res) => {
    try {
      const datosHabitacion = await servicio.mostrarTodasHabitaciones();
      res.status(200).json(datosHabitacion);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Mostrar habitación por ID
  const mostrarHabitacionID = async (req, res) => {
    try {
      const { hotel_id  } = req.query;
      const habitacionID = await servicio.mostrarHabitacionID(hotel_id);
      res.status(200).json(habitacionID);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  // Borrar una habitación
  const borrarHabitacion = async (req, res) => {
    try {
      const { id } = req.query;
      const resultado = await servicio.borrarHabitacion(id);
      const mensaje =
        (resultado.affectedRows || resultado) === 0
          ? "No se encontró la habitación con el ID proporcionado"
          : "Habitación borrada exitosamente";

      res.status(200).json({
        mensaje,
        affectedRows: resultado.affectedRows || resultado,
      });
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  //  Exportar correctamente todas las funciones de habitaciones
  return {
    crearHabitacion,
    actualizarHabitacion,
    actualizarIdHabitacion,
    apartarEstatusHabitacion,
    mostrarEstatusHabitacion,
    mostrarTodasHabitaciones,
    mostrarHabitacionID,
    borrarHabitacion,
  };
};

export default habitacionControlador;
