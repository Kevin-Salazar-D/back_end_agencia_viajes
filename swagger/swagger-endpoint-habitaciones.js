/**
 * @swagger
 * tags:
 *   name: Habitaciones
 *   description: Endpoints para la gestión de habitaciones
 */




/**
 * @swagger
 * /habitaciones/mostrarEstatusHabitacion:
 *   get:
 *     tags:
 *       - Habitaciones
 *     summary: Obtener el estatus de una habitación
 *     description: Retorna si la habitación está disponible (0) o apartada (1).
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *     responses:
 *       200:
 *         description: Estatus de la habitación
 */



/**
 * @swagger
 * /habitaciones/mostrarTodasHabitaciones:
 *   get:
 *     tags:
 *       - Habitaciones
 *     summary: Mostrar todas las habitaciones
 *     description: Retorna la lista completa de habitaciones registradas.
 *     responses:
 *       200:
 *         description: Lista de habitaciones
 */



/**
 * @swagger
 * /habitaciones/mostrarHabitacionesPorHotel:
 *   get:
 *     tags:
 *       - Habitaciones
 *     summary: Obtener habitaciones filtradas por hotel
 *     description: Retorna todas las habitaciones del hotel indicado.
 *     parameters:
 *       - in: query
 *         name: hotel_id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 12
 *     responses:
 *       200:
 *         description: Habitaciones encontradas
 */



/**
 * @swagger
 * /habitaciones/crearHabitacion:
 *   post:
 *     tags:
 *       - Habitaciones
 *     summary: Crear una nueva habitación
 *     description: Registra una nueva habitación en un hotel.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - hotel_id
 *               - numero_habitacion
 *               - tipo_habitacion
 *             properties:
 *               hotel_id:
 *                 type: integer
 *                 example: 12
 *               numero_habitacion:
 *                 type: integer
 *                 example: 305
 *               tipo_habitacion:
 *                 type: string
 *                 example: "Suite doble"
 *     responses:
 *       201:
 *         description: Habitación creada exitosamente
 */



/**
 * @swagger
 * /habitaciones/actualizarHabitacion:
 *   put:
 *     tags:
 *       - Habitaciones
 *     summary: Actualizar datos de una habitación
 *     description: Modifica la información completa de una habitación.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 8
 *               numero_habitacion:
 *                 type: integer
 *                 example: 402
 *               tipo_habitacion:
 *                 type: string
 *                 example: "Suite King"
 *               estatus:
 *                 type: integer
 *                 example: 0
 *     responses:
 *       200:
 *         description: Habitación actualizada exitosamente
 */



/**
 * @swagger
 * /habitaciones/actualizarIdHabitacion:
 *   put:
 *     tags:
 *       - Habitaciones
 *     summary: Mover habitación a otro hotel
 *     description: Actualiza el hotel asignado a la habitación mediante su ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - hotel_id
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 4
 *               hotel_id:
 *                 type: integer
 *                 example: 15
 *     responses:
 *       200:
 *         description: Hotel asignado actualizado correctamente
 */



/**
 * @swagger
 * /habitaciones/apartarEstatusHabitacion:
 *   put:
 *     tags:
 *       - Habitaciones
 *     summary: Apartar una habitación
 *     description: Cambia el estatus de la habitación a apartado (1).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 7
 *     responses:
 *       200:
 *         description: Habitación apartada correctamente
 */
/**
 * @swagger
 * /habitaciones/desocuparEstatusHabitacion:
 *   put:
 *     tags:
 *       - Habitaciones
 *     summary: Desocupar una habitacion apartada
 *     description: Cambia el estatus de la habitación a desocupado (0).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 7
 *     responses:
 *       200:
 *         description: Habitación desocupada correctamente
 */



/**
 * @swagger
 * /habitaciones/borrarHabitacion:
 *   delete:
 *     tags:
 *       - Habitaciones
 *     summary: Borrar una habitación
 *     description: Elimina una habitación mediante el ID enviado en el body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 9
 *     responses:
 *       200:
 *         description: Habitación eliminada exitosamente
 */
