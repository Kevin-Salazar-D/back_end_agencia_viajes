const detallesHotelesControlador = (servicioImagenes) => {
  
  // Crear imagen de hotel
  const crearImagenHotel = async (req, res) => {
    try {
      const { hotel_id, url, orden } = req.body;

      const nuevaImagen = { hotel_id, url, orden };

      const resultado = await servicioImagenes.crearImagenHotel(nuevaImagen);

      res.status(201).json({
        message: "Imagen creada correctamente",
        imagenID: resultado
      });

    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };


  // Actualizar imagen del hotel
 const actualizarImagenHotel = async (req, res) => {
  try {
    const { url, tipo, orden, hotel_id } = req.body;

    const data = { url, tipo, orden, hotel_id };

    const resultado = await servicioImagenes.actualizarImagenesHoteles(data);

    res.status(200).json({
      message: "Imagen del hotel actualizada correctamente",
      resultado: resultado
    });

  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};



  // Mostrar todas las imágenes de un hotel
  const mostrarImagenesHotel = async (req, res) => {
    try {
      const { hotel_id } = req.query;

      const imagenes = await servicioImagenes.mostrarImagenesHotel(hotel_id);

      res.status(200).json(imagenes);

    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };


  // Borrar una imagen del hotel
  const borrarImagenHotel = async (req, res) => {
    try {
      const { id } = req.body;

      const resultado = await servicioImagenes.borrarImagenHotel(id);

      res.status(200).json({
        message: "Imagen eliminada correctamente",
        resultado
      });

    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };


  return {
    crearImagenHotel,
    actualizarImagenHotel,
    mostrarImagenesHotel,
    borrarImagenHotel
  };
};

export default detallesHotelesControlador;
