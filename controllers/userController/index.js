const userController = (servicioUsuario) => {  

    const crearUsuario = async (req, res) => {
        try {
            const { usuario, correo, contra, nombre, apellido, telefono } = req.body;
            const nuevoUsuario = { usuario, correo, contra, nombre, apellido, telefono };
            const resultado = await servicioUsuario.crearUsuario(nuevoUsuario);
            res.status(201).json({ message: "Usuario creado exitosamente", usuarioId: resultado.insertId || resultado });
            
        } catch (error) {
             console.error("🚨 ERROR EN CREAR USUARIO:", error); // <-- Aquí vemos el error real
             res.status(error.status || 500).json({ error: error.message });
        }
    };

    const actualizarUsuario = async (req, res) => {
        try {
            const { id, usuario, correo, nombre, apellido, telefono } = req.body;
            const usuarioActualizar = { id, usuario, correo,  nombre, apellido, telefono };
            const resultado = await servicioUsuario.actualizarUsuario(usuarioActualizar);
            res.status(200).json({ message: "Usuario actualizado exitosamente", affectedRows: resultado.affectedRows || resultado });
            
        } catch (error) {
            console.error("🚨 ERROR EN ACTUALIZAR USUARIO:", error); // <-- Aquí vemos el error real
            res.status(error.status || 500).json({ error: error.message });
        }
    };

    const borrarUsuario = async (req, res) => {
        try {
            const { id } = req.body;
            const resultado = await servicioUsuario.borrarUsuario(id);
            res.status(200).json({ message: "Usuario borrado exitosamente", resultado: resultado.affectedRows || resultado });
            
        } catch (error) {
            console.error("🚨 ERROR EN BORRAR USUARIO:", error); // <-- Aquí vemos el error real
            res.status(error.status || 500).json({ error: error.message });
        }
    };

    const mostrarTodosUsuarios = async (req, res) => {
        try {
            const usuarios = await servicioUsuario.mostrarTodosUsuarios();
            res.status(200).json(usuarios);
        } catch (error) {
            console.error("🚨 ERROR EN MOSTRAR USUARIOS:", error); // <-- Aquí vemos el error real
            res.status(500).json({ error: error.message });
        }
    };

    return { crearUsuario, actualizarUsuario, borrarUsuario, mostrarTodosUsuarios };
};

export default userController;