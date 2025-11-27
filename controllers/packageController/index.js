// Controlador de paquetes
const paqueteControlador = (paqueteServicio) => {

  // Crear un nuevo paquete
  const crearPaquete = async (req, res) => {
    try {
      const { transporte_id, ciudad_id, tipo_paquete, descripcion, precio, fecha_inicio, fecha_fin, tiempo_estadia, hotel_id } = req.body;

      const nuevoPaquete = {
        transporte_id,
        ciudad_id,
        tipo_paquete,
        descripcion,
        precio,
        fecha_inicio,
        fecha_fin,
        tiempo_estadia,
        hotel_id
      };

      const resultado = await paqueteServicio.crearPaquete(nuevoPaquete);

      res.status(201).json({
        message: "Paquete creado exitosamente",
        paqueteID: resultado.insertId || resultado,
      });

    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  // Actualizar un paquete
  const actualizarPaquete = async (req, res) => {
    try {
      const { id, transporte_id, ciudad_id, tipo_paquete, descripcion, precio, fecha_inicio, fecha_fin, tiempo_estadia, hotel_id } = req.body;

      const paqueteActualizado = {
        id,
        transporte_id,
        ciudad_id,
        tipo_paquete,
        descripcion,
        precio,
        fecha_inicio,
        fecha_fin,
        tiempo_estadia,
        hotel_id
      };

      const resultado = await paqueteServicio.actualizarPaquete(paqueteActualizado);

      res.status(200).json({
        message: "Paquete actualizado exitosamente",
        resultado: resultado,
      });

    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  // Mostrar paquetes filtrados por hotel
  const mostrarPaquetesPorHotel = async (req, res) => {
    try {
      const { hotel_id } = req.params;

      const paquetes = await paqueteServicio.mostrarPaquetesPorHotel(hotel_id);

      res.status(200).json(paquetes);

    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  // Mostrar paquete por ID
  const mostrarPaqueteID = async (req, res) => {
    try {
      const { id } = req.params;

      const paquete = await paqueteServicio.mostrarPaqueteID(id);

      res.status(200).json(paquete);

    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  // Mostrar todos los paquetes
  const mostrarTodosPaquetes = async (req, res) => {
    try {
      const paquetes = await paqueteServicio.mostrarTodosPaquetes();
      res.status(200).json(paquetes);

    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  // Borrar un paquete por ID
  const borrarPaquete = async (req, res) => {
    try {
      const { id } = req.body;

      const paqueteBorrado = await paqueteServicio.borrarPaquete(id);

      res.status(200).json({
        message: "Paquete borrado correctamente",
        resultado: paqueteBorrado,
      });

    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  return {
    crearPaquete,
    actualizarPaquete,
    mostrarPaquetesPorHotel,
    mostrarPaqueteID,
    mostrarTodosPaquetes,
    borrarPaquete,
  };
};

export default paqueteControlador;
