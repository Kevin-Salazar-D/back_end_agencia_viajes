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
 *                 example: "kevin123"
 *               correo:
 *                 type: string
 *                 example: "kevin@email.com"
 *               contra:
 *                 type: string
 *                 example: "12345"
 *               nombre:
 *                 type: string
 *                 example: "Kevin"
 *               apellido:
 *                 type: string
 *                 example: "Salazar"
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
 *                 example: "kevin123"
 *               correo:
 *                 type: string
 *                 example: "kevin@email.com"
 *               nombre:
 *                 type: string
 *                 example: "Kevin"
 *               apellido:
 *                 type: string
 *                 example: "Salazar"
 *               telefono:
 *                 type: string
 *                 example: "555-9876"
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
 */
