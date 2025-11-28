// Controlador de pagos
const pagosControlador = (pagoServicio) => {

  // Crear un nuevo pago
  const crearPago = async (req, res) => {
    try {
      const {
        usuario_id,
        paquete_id,
        precio_final,
        numero_tarjeta,
        cvv,
        reservacion_id
      } = req.body;

      const nuevoPago = {
        usuario_id,
        paquete_id,
        precio_final,
        numero_tarjeta,
        cvv,
        reservacion_id
      };

      const resultado = await pagoServicio.crearPago(nuevoPago);

      res.status(201).json({
        message: "Pago registrado exitosamente",
        pagoID: resultado.insertId || resultado,
      });

    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  // Actualizar un pago por folio
  const actualizarPago = async (req, res) => {
    try {
      const {
        folio,
        precio_final,
        estatus
      } = req.body;

      const pagoActualizado = {
        folio,
        precio_final,
        estatus
      };

      const resultado = await pagoServicio.actualizarPago(pagoActualizado);

      res.status(200).json({
        message: "Pago actualizado exitosamente",
        resultado: resultado,
      });

    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  // Mostrar todos los pagos
  const mostrarTodosPagos = async (req, res) => {
    try {
      const pagos = await pagoServicio.mostrarTodosPagos();
      res.status(200).json(pagos);

    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  // Mostrar pago por reservación
  const mostrarPagoPorReservacion = async (req, res) => {
    try {
      const { reservacion_id } = req.params;

      const pago = await pagoServicio.mostrarPagoPorReservacion(reservacion_id);

      res.status(200).json(pago);

    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  // Mostrar pago por folio
  const mostrarPagoPorFolio = async (req, res) => {
    try {
      const { folio } = req.params;

      const pago = await pagoServicio.mostrarPagoPorFolio(folio);

      res.status(200).json(pago);

    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  // Borrar pago por ID
  const borrarPago = async (req, res) => {
    try {
      const { id } = req.body;

      const pagoBorrado = await pagoServicio.borrarPago(id);

      res.status(200).json({
        message: "Pago borrado correctamente",
        resultado: pagoBorrado,
      });

    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  return {
    crearPago,
    actualizarPago,
    mostrarTodosPagos,
    mostrarPagoPorReservacion,
    mostrarPagoPorFolio,
    borrarPago,
  };
};

export default pagosControlador;
