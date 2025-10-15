const cityController = (servicioCiudad)=>{

 const crearCiudad = async (req, res) => {
        try {
            const { nombre, pais, region, codigo_postal } = req.body;
            const nuevaCiudad = { nombre, pais, region, codigo_postal };
            const resultado = await servicioCiudad.crearCiudad(nuevaCiudad);
            res.status(201).json({ message: "Ciudad creada exitosamente", usuarioId: resultado.insertId || resultado });
            
        } catch (error) {
             res.status(error.status || 500).json({ error: error.message });
        }
    };
const actualizarCiudad = async (req, res) => {
        try {
            const {id, nombre, pais, region, codigo_postal } = req.body;
            const nuevaCiudad = { id, nombre, pais, region, codigo_postal };
            const resultado = await servicioCiudad.actualizarCiudad(nuevaCiudad);
            res.status(200).json({ message: "Datos de la ciudad actualizados exitosamente", usuarioId: resultado.insertId || resultado });
            
        } catch (error) {
             res.status(error.status || 500).json({ error: error.message });
        }
    };
const borrarCiudad = async (req, res) => {
        try {
            const { id } = req.body;
            const resultado = await servicioCiudad.borrarCiudad(id);
            res.status(200).json({ message: "Se ha borrado la ciudad exitosamente", usuarioId: resultado.insertId || resultado });
            
        } catch (error) {
             res.status(error.status || 500).json({ error: error.message });
        }
    };
const mostrarTodasCiudades = async (req, res) => {
        try {
            const ciudades  = await servicioCiudad.mostrarTodasCiudades();
            res.status(200).json(ciudades);            
        } catch (error) {
             res.status(error.status || 500).json({ error: error.message });
        }
    };
            return { crearCiudad, actualizarCiudad, borrarCiudad, mostrarTodasCiudades };

}

export default cityController;