const transportController = (servicioTransporte) => {

    const crearTransporte = async (req, res) => {
        try {
            const { tipo,nombre , modelo, capacidad, asientos_disponibles } = req.body;
            const nuevoTransporte = { tipo, nombre, modelo, capacidad, asientos_disponibles };
            const resultado = await servicioTransporte.crearTransporte(nuevoTransporte);
            res.status(201).json({ message: "Transporte creado exitosamente", transporteId: resultado.insertId || resultado });

        } catch (error) {
             res.status(error.status || 500).json({ error: error.message });
        }
    };

    const actualizarTransporte = async (req, res) => {
        try {
            const { id, tipo, nombre, modelo, capacidad, asientos_disponibles, estatus } = req.body;
            const transporteActualizar = { id, tipo, nombre, modelo, capacidad, asientos_disponibles, estatus };
            const resultado = await servicioTransporte.actualizarTransporte(transporteActualizar);
            res.status(200).json({ message: "Transporte actualizado exitosamente", affectedRows: resultado.affectedRows || resultado });
        } catch (error) {
            res.status(error.status || 500).json({ error: error.message });
        }
    };

    const borrarTransporte = async (req, res) => {
        try {
            const { id } = req.body;
            const resultado = await servicioTransporte.borrarTransporte(id);
            const message = (resultado.affectedRows || resultado) === 0 ? "No se encontró el transporte con el ID proporcionado" : "Transporte borrado exitosamente";
            res.status(200).json({ message: message, affectedRows: resultado.affectedRows || resultado });
        } catch (error) {
            res.status(error.status || 500).json({ error: error.message });
        }
    };

    const mostrarTodosTransportes = async (req, res) => {
        try {
            const transportes = await servicioTransporte.mostrarTodosTransportes();
            res.status(200).json(transportes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const buscarTransportePorId = async (req, res) => {
        try {
            const { id } = req.params;
            const transporte = await servicioTransporte.buscarTransportePorId(id);
            res.status(200).json(transporte);
        } catch (error) {
            res.status(error.status || 500).json({ error: error.message });
        }
    };

    const buscarTransportePorTipo = async (req, res) => {
        try {
            const { tipo } = req.params;
            const transportes = await servicioTransporte.buscarTransportePorTipo(tipo);
            res.status(200).json(transportes);
        } catch (error) {
            res.status(error.status || 500).json({ error: error.message });
        }
    };
    
    return { crearTransporte, actualizarTransporte, borrarTransporte, mostrarTodosTransportes, buscarTransportePorId, buscarTransportePorTipo };
};

export default transportController;