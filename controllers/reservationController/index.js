const reservacionControlador = (reservacionServicio) => {

  // Crear una nueva reservacion
  const crearReservacion = async (req, res) => {
    try {
      const { usuario_id, paquete_id, habitacion_id, fecha_reserva, fecha_entrada, fecha_salida } = req.body;

      const nuevaReservacion = { usuario_id, paquete_id, habitacion_id, fecha_reserva, fecha_entrada, fecha_salida };

      const resultado = await reservacionServicio.crearReservacion(nuevaReservacion);

      res.status(201).json({
      mensaje: "Reservacion creada exitosamente",
      numero_reserva: resultado.numero_reserva, 
      resultado: resultado.resultado 
    });

    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  // Actualizar una reservacion
  const actualizarReservacion = async (req, res) => {
    try {
      const { usuario_id, paquete_id, habitacion_id, fecha_reserva, fecha_entrada, fecha_salida, numero_reserva, estatus } = req.body;

      const reservacionActualizada = { usuario_id, paquete_id, habitacion_id, fecha_reserva, fecha_entrada, fecha_salida, numero_reserva, estatus };

      const resultado = await reservacionServicio.actualizarReservacion(reservacionActualizada);

      res.status(200).json({
        mensaje: "Reservacion actualizada exitosamente",
        resultado,
      });

    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  // Mostrar una reservacion por numero
  const mostrarReservacion = async (req, res) => {
    try {
      const { numero_reserva } = req.params;
      const reservacion = await reservacionServicio.mostrarReservacion(numero_reserva);
      res.status(200).json(reservacion);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  // Mostrar todas las reservaciones
  const mostrarTodasReservaciones = async (req, res) => {
    try {
      const reservaciones = await reservacionServicio.mostrarTodasReservaciones();
      res.status(200).json(reservaciones);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  // Borrar una reservacion por numero
  const borrarReservacion = async (req, res) => {
    try {
      const { numero_reserva, habitacion_id } = req.body;
      const reservaBorrada = await reservacionServicio.borrarReservacion({numero_reserva, habitacion_id});

      res.status(200).json({
        mensaje: "Reservacion borrada correctamente",
        resultado: reservaBorrada,
      });
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  return {
    crearReservacion,
    actualizarReservacion,
    mostrarReservacion,
    mostrarTodasReservaciones,
    borrarReservacion,
  };
};

export default reservacionControlador;
