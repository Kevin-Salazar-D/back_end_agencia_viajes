// Controlador de viajes
const viajeControlador = (servicioViaje) => {

  // Crear un nuevo viaje
  const crearViaje = async (req, res) => {
    try {
      const { tipo_transporte_id, fecha_salida, fecha_llegada, origen_ciudad_id, destino_ciudad_id, numero_transporte } =
        req.body;

      const nuevoViaje = {
        tipo_transporte_id,
        fecha_salida,
        fecha_llegada,
        origen_ciudad_id,
        destino_ciudad_id,
        numero_transporte,
      };

      const resultado = await servicioViaje.crearViaje(nuevoViaje);

      res.status(201).json({
        message: "Viaje creado exitosamente",
        viajeID: resultado.insertId || resultado,
      });

    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  // Actualizar un viaje
  const actualizarViaje = async (req, res) => {
    try {
      const { tipo_transporte_id, fecha_salida, fecha_llegada, origen_ciudad_id, destino_ciudad_id, numero_transporte, id } =
        req.body;

      const viajeActualizado = {
        tipo_transporte_id,
        fecha_salida,
        fecha_llegada,
        origen_ciudad_id,
        destino_ciudad_id,
        numero_transporte,
        id,
      };

      const resultado = await servicioViaje.actualizarViaje(viajeActualizado);

      res.status(200).json({
        message: "Viaje actualizado exitosamente",
        resultado: resultado,
      });

    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  // Mostrar viajes filtrados por ciudad origen y destino
  const mostrarFiltroViaje = async (req, res) => {
    try {
      const { ciudad_origen, ciudad_destino } = req.params;

      const filtroViajes = await servicioViaje.mostrarFiltroViaje(ciudad_origen, ciudad_destino);

      res.status(200).json(filtroViajes);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Mostrar viaje por ID
  const mostrarViajeID = async (req, res) => {
    try {
      const { id } = req.params; // lo puse en params para que sea /viajes/:id

      const viaje = await servicioViaje.mostrarViajeID(id);

      res.status(200).json(viaje);

    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  // Mostrar todos los viajes
  const mostrarTodosLosViajes = async (req, res) => {
    try {
      const viajes = await servicioViaje.mostrarTodosLosViajes();
      res.status(200).json(viajes);

    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  // Borrar un viaje por ID
  const borrarViaje = async (req, res) => {
    try {
      const { id } = req.body;

      const viajeBorrado = await servicioViaje.borrarViaje(id);

      res.status(200).json({
        mensaje: "Viaje borrado correctamente",
        resultado: viajeBorrado,
      });

    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  return {
    crearViaje,
    actualizarViaje,
    mostrarFiltroViaje,
    mostrarViajeID,
    mostrarTodosLosViajes,
    borrarViaje,
  };
};

export default viajeControlador;
