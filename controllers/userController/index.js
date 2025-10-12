const userController = (servicioUsuario) => {  

    const crearUsuario = async (req, res) => {
        try {
            const { usuario, correo, contra, nombre, apellido, telefono } = req.body;
            if (!usuario || !correo || !contra  || !nombre || !apellido || !telefono) {
                return res.status(400).json({ error: "Faltan datos obligatorios para crear el usuario" });
            }

            const nuevoUsuario = { usuario, correo, contra, nombre, apellido, telefono };
            const resultado = await servicioUsuario.crearUsuario(nuevoUsuario);
            res.status(201).json({ message: "Usuario creado exitosamente", usuarioId: resultado.insertId || resultado });
            
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const actualizarUsuario = async (req, res) => {
        try {
            const { id, usuario, correo, nombre, apellido, telefono } = req.body;
            if (!id || !usuario || !correo   || !nombre || !apellido || !telefono) {
                return res.status(400).json({ error: "Faltan datos obligatorios para actualizar el usuario" });
            }

            const usuarioActualizar = { id, usuario, correo,  nombre, apellido, telefono };
            const resultado = await servicioUsuario.actualizarUsuario(usuarioActualizar);
            res.status(200).json({ message: "Usuario actualizado exitosamente", affectedRows: resultado.affectedRows || resultado });
            
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const borrarUsuario = async (req, res) => {
        try {
            const { id } = req.body;
            if (!id) {
                return res.status(400).json({ error: "Falta el ID del usuario a eliminar" });
            }

            const resultado = await servicioUsuario.borrarUsuario(id);
            res.status(200).json({ message: "Usuario borrado exitosamente", affectedRows: resultado.affectedRows || resultado });
            
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const mostrarTodosUsuarios = async (req, res) => {
        try {
            const usuarios = await servicioUsuario.mostrarTodosUsuarios();
            res.status(200).json(usuarios);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    return { crearUsuario, actualizarUsuario, borrarUsuario, mostrarTodosUsuarios };
};

export default userController;
