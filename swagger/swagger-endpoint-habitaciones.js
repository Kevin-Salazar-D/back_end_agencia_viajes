/**
 * @swagger
 * tags:
 *   name: Habitaciones
 *   description: Endpoints para la gestión de habitaciones
 *
 * /habitaciones/mostrarTodasHabitaciones:
 *   get:
 *     tags:
 *       - Habitaciones
 *     summary: Obtiene todas las habitaciones registradas
 *     responses:
 *       200:
 *         description: Lista de habitaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   hotel_id:
 *                     type: integer
 *                     example: 3
 *                   numero_habitacion:
 *                     type: string
 *                     example: "101A"
 *                   tipo_habitacion:
 *                     type: string
 *                     example: "Suite"
 *                   estatus:
 *                     type: integer
 *                     example: 0
 *
 * /habitaciones/crearHabitacion:
 *   post:
 *     tags:
 *       - Habitaciones
 *     summary: Crea una nueva habitación (estatus se asigna automáticamente)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hotel_id:
 *                 type: integer
 *                 example: 3
 *               numero_habitacion:
 *                 type: string
 *                 example: "101A"
 *               tipo_habitacion:
 *                 type: string
 *                 example: "Suite"
 *     responses:
 *       201:
 *         description: Habitacion creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 habitacionID:
 *                   type: integer
 *                   example: 10
 *
 * /habitaciones/mostrarHabitacionID:
 *   get:
 *     tags:
 *       - Habitaciones
 *     summary: Obtiene todas las habitaciones de un hotel
 *     parameters:
 *       - in: query
 *         name: hotel_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del hotel
 *     responses:
 *       200:
 *         description: Lista de habitaciones asociadas al hotel
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   hotel_id:
 *                     type: integer
 *                     example: 3
 *                   numero_habitacion:
 *                     type: string
 *                     example: "101A"
 *                   tipo_habitacion:
 *                     type: string
 *                     example: "Suite"
 *                   estatus:
 *                     type: integer
 *                     example: 0
 *
 * /habitaciones/actualizarHabitacion:
 *   put:
 *     tags:
 *       - Habitaciones
 *     summary: Actualiza los datos de una habitación
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
 *               numero_habitacion:
 *                 type: string
 *                 example: "102B"
 *               tipo_habitacion:
 *                 type: string
 *                 example: "Doble"
 *               estatus:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Número de registros actualizados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 affectedRows:
 *                   type: integer
 *                   example: 1
 *
 * /habitaciones/actualizarIdHabitacion:
 *   put:
 *     tags:
 *       - Habitaciones
 *     summary: Actualiza el hotel_id asociado a una habitación
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
 *               hotel_id:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Número de registros actualizados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 affectedRows:
 *                   type: integer
 *                   example: 1
 *
 * /habitaciones/apartarHabitacion:
 *   put:
 *     tags:
 *       - Habitaciones
 *     summary: Cambia el estatus de una habitación a "apartada"
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
 *         description: Habitacion apartada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estatus:
 *                   type: string
 *                   example: "Se apartó correctamente la habitación"
 *
 * /habitaciones/borrarHabitacion/{id}:
 *   delete:
 *     tags:
 *       - Habitaciones
 *     summary: Elimina una habitación por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la habitación a eliminar
 *     responses:
 *       200:
 *         description: Número de registros eliminados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 affectedRows:
 *                   type: integer
 *                   example: 1
 */
