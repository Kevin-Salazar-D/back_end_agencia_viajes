const detallesHotelesControlador = (servicioDetalles) => {

  // Crear detalles de hotel
  const crearDetallesHoteles = async (req, res) => {
    try {
      const {
        hotel_id,
        descripcion,
        amenidades,
        total_resenas,
        politicas,
        check_in,
        check_out,
        cancelacion,
        retricciones,
        precio_noche
      } = req.body;

      const nuevoDetalle = {
        hotel_id,
        descripcion,
        amenidades,
        total_resenas,
        politicas,
        check_in,
        check_out,
        cancelacion,
        retricciones,
        precio_noche
      };

      const resultado = await servicioDetalles.crearDetallesHoteles(nuevoDetalle);

      res.status(201).json({
        message: "Detalles del hotel creados correctamente",
        detalleID: resultado
      });

    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };


  // Actualizar detalles hotel
  const actualizarDetallesHotel = async (req, res) => {
    try {
      const {
        id,
        hotel_id,
        descripcion,
        amenidades,
        total_resenas,
        politicas,
        check_in,
        check_out,
        cancelacion,
        retricciones,
        precio_noche
      } = req.body;

      const data = {
        id,
        hotel_id,
        descripcion,
        amenidades,
        total_resenas,
        politicas,
        check_in,
        check_out,
        cancelacion,
        retricciones,
        precio_noche
      };

      const resultado = await servicioDetalles.actualizarDetallesHotel(data);

      res.status(200).json({
        message: "Detalles del hotel actualizados correctamente",
        resultado: resultado
      });

    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };


  // Mostrar todos los detalles
  const mostrarTodosDetallesHoteles = async (req, res) => {
    try {
      const detalles = await servicioDetalles.mostrarTodosDetallesHoteles();
      res.status(200).json(detalles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  // Mostrar detalles de un hotel
  // Mostrar detalles de un hotel
const mostrarDetallesDeUnHotel = async (req, res) => {
  try {
    const { hotel_id } = req.params;

    const detalles = await servicioDetalles.mostrarDetallesDeUnHotel(hotel_id);

    res.status(200).json(detalles);

  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};



  // Borrar detalle
  const borrarDetalleHotel = async (req, res) => {
    try {
      const { id } = req.query;
      const resultado = await servicioDetalles.borrarDetalleHotel(id);

      res.status(200).json({
        message: "Detalle eliminado correctamente",
        resultado
      });

    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  return {
    crearDetallesHoteles,
    actualizarDetallesHotel,
    mostrarTodosDetallesHoteles,
    mostrarDetallesDeUnHotel,
    borrarDetalleHotel
  };
};

export default detallesHotelesControlador;
