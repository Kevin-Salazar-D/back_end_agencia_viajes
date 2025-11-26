// Controlador de hoteles
const hotelControlador = (servicioHotel) => {
  // Crear un nuevo hotel
  const crearHotel = async (req, res) => {
    try {
      const { ciudad_id, nombre, direccion, imagen, estrellas, telefono } =
        req.body;
      const nuevoHotel = {
        ciudad_id,
        nombre,
        direccion,
        imagen,
        estrellas,
        telefono,
      };
      const resultado = await servicioHotel.crearHotel(nuevoHotel);
      res
        .status(201)
        .json({
          message: "Hotel creado exitosamente",
          hotelID: resultado.insertId || resultado,
        });
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  // Actualizar datos de un hotel
  const actualizarHotel = async (req, res) => {
    try {
      const { nombre, direccion, imagen, estrellas, telefono, ciudad_id, id } =
        req.body;

      const hotelData = {
        nombre,
        direccion,
        imagen,
        estrellas,
        telefono,
        ciudad_id,
        id,
      };

      const resultado = await servicioHotel.actualizarHotel(hotelData);

      res.status(200).json({
        message: "Hotel actualizado exitosamente",
        affectedRows: resultado.affectedRows,
      });
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  // Cambiar la ciudad de un hotel
  const actualizarCiudadIdHotel = async (req, res) => {
    try {
      const { ciudad_id, id } = req.body;
      const actualizarCiudadH = { ciudad_id, id };
      const resultado = await servicioHotel.actualizarCiudadIdHotel(
        actualizarCiudadH
      );
      res
        .status(200)
        .json({  message: "Hotel actualizado exitosamente", resultado: resultado.affectedRows || resultado });
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  // Mostrar todos los hoteles
  const mostrarTodosHoteles = async (req, res) => {
    try {
      const hoteles = await servicioHotel.mostrarTodosHoteles();
      res.status(200).json(hoteles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Mostrar hoteles por ciudad
  const mostrarHotelesCiudad = async (req, res) => {
    try {
      const { ciudad_id } = req.query;
      const hoteles = await servicioHotel.mostrarHotelesCiudad(ciudad_id);
      res.status(200).json(hoteles);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  // Borrar hotel por ID
  const borrarHotel = async (req, res) => {
    try {
      const { id } = req.body;
      const hotelBorrado = await servicioHotel.borrarHotel(id);

      res
        .status(200)
        .json({
          message:
            hotelBorrado === 0
              ? "Hotel no se elimino"
              : "Hotel eliminado correctamente",
            resultado: hotelBorrado
        });
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  return {
    crearHotel,
    actualizarHotel,
    actualizarCiudadIdHotel,
    mostrarTodosHoteles,
    mostrarHotelesCiudad,
    borrarHotel,
  };
};

export default hotelControlador;
