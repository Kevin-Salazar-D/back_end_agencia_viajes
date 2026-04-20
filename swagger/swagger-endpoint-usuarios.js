/**
 * @swagger
 * /usuarios/obtenerTodosUsuarios:
 *   get:
 *     tags:
 *       - Usuarios
 *     summary: Obtiene todos los usuarios
 *     description: Retorna una lista con todos los usuarios registrados.
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *
 * /usuarios/crearUsuarios:
 *   post:
 *     tags:
 *       - Usuarios
 *     summary: Crea un nuevo usuario
 *     description: Permite registrar un nuevo usuario en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *                 example: kevin123
 *               correo:
 *                 type: string
 *                 example: kevin@email.com
 *               contra:
 *                 type: string
 *                 example: "12345"
 *               nombre:
 *                 type: string
 *                 example: Kevin
 *               apellido:
 *                 type: string
 *                 example: Salazar
 *               telefono:
 *                 type: string
 *                 example: "555-1234"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *
 * /usuarios/actualizarUsuario:
 *   put:
 *     tags:
 *       - Usuarios
 *     summary: Actualiza los datos de un usuario existente
 *     description: Modifica la información de un usuario según su ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               usuario:
 *                 type: string
 *                 example: kevin123
 *               correo:
 *                 type: string
 *                 example: kevin@email.com
 *               nombre:
 *                 type: string
 *                 example: Kevin
 *               apellido:
 *                 type: string
 *                 example: Salazar
 *               telefono:
 *                 type: string
 *                 example: "555-9876"
 *               genero:
 *                 type: string
 *                 example: Masculino
 *               fecha_nacimiento:
 *                 type: string
 *                 format: date
 *                 example: "1998-10-25"
 *               nacionalidad:
 *                 type: string
 *                 example: MX
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *
 * /usuarios/eliminarUsuario:
 *   delete:
 *     tags:
 *       - Usuarios
 *     summary: Elimina un usuario por ID
 *     description: Borra un usuario específico del sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *
 * /usuarios/buscarUsuarioPorId/{id}:
 *   get:
 *     tags:
 *       - Usuarios
 *     summary: Busca un usuario por ID
 *     description: Retorna la informacion de un usuario especifico segun su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Usuario encontrado exitosamente
 *
 * /usuarios/buscarUsuarioPorCorreo/{correo}:
 *   get:
 *     tags:
 *       - Usuarios
 *     summary: Busca un usuario por correo
 *     description: Retorna la informacion de un usuario especifico segun su correo.
 *     parameters:
 *       - in: path
 *         name: correo
 *         required: true
 *         schema:
 *           type: string
 *           example: juana@email.com
 *     responses:
 *       200:
 *         description: Usuario encontrado exitosamente
 */