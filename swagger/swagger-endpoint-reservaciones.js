/**
 * @swagger
 * tags:
 *   name: Reservaciones
 *   description: Endpoints para la gestión de reservaciones
 */

/**
 * @swagger
 * /reservaciones/mostrarTodasReservaciones:
 *   get:
 *     tags:
 *       - Reservaciones
 *     summary: Obtener todas las reservaciones
 *     description: Retorna una lista con toda la información de las reservaciones registradas.
 *     responses:
 *       200:
 *         description: Lista completa de reservaciones
 */

/**
 * @swagger
 * /reservaciones/mostrarReservacion/{numero_reserva}:
 *   get:
 *     tags:
 *       - Reservaciones
 *     summary: Obtener una reservación por número de reservación
 *     description: Devuelve la información completa de la reservación, incluyendo usuario, habitación y paquete.
 *     parameters:
 *       - in: path
 *         name: numero_reserva
 *         required: true
 *         schema:
 *           type: string
 *         example: "RES-1A2B3C"
 *     responses:
 *       200:
 *         description: Información de la reservación solicitada
 */

/**
 * @swagger
 * /reservaciones/crearReservacion:
 *   post:
 *     tags:
 *       - Reservaciones
 *     summary: Crear una nueva reservación
 *     description: Registra una nueva reservación en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - habitacion_id
 *               - fecha_entrada
 *               - fecha_salida
 *             properties:
 *               usuario_id:
 *                 type: integer
 *                 example: 1
 *               paquete_id:
 *                 type: integer
 *                 example: 13
 *               habitacion_id:
 *                 type: integer
 *                 example: 2
 *               fecha_entrada:
 *                 type: string
 *                 example: "2026-04-10"
 *               fecha_salida:
 *                 type: string
 *                 example: "2026-04-12"
 *     responses:
 *       201:
 *         description: Reservación creada exitosamente
 */

/**
 * @swagger
 * /reservaciones/actualizarReservacion:
 *   put:
 *     tags:
 *       - Reservaciones
 *     summary: Actualizar una reservación existente
 *     description: Actualiza la información de una reservación mediante el número de reservación.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - numero_reserva
 *             properties:
 *               numero_reserva:
 *                 type: string
 *                 example: "RES-1A2B3C"
 *               usuario_id:
 *                 type: integer
 *                 example: 1
 *               paquete_id:
 *                 type: integer
 *                 example: 13
 *               habitacion_id:
 *                 type: integer
 *                 example: 2
 *               fecha_entrada:
 *                 type: string
 *                 example: "2026-04-10"
 *               fecha_salida:
 *                 type: string
 *                 example: "2026-04-12"
 *               estatus:
 *                 type: integer
 *                 description: 0 = Pendiente, 1 = Confirmada, 2 = Cancelada
 *                 example: 1
 *     responses:
 *       200:
 *         description: Reservación actualizada correctamente
 */

/**
 * @swagger
 * /reservaciones/borrarReservacion:
 *   delete:
 *     tags:
 *       - Reservaciones
 *     summary: Borrar una reservación
 *     description: Elimina una reservación mediante el número de reservación enviado en el cuerpo.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - numero_reserva
 *             properties:
 *               numero_reserva:
 *                 type: string
 *                 example: "RES-1A2B3C"
 *               habitacion_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Reservación borrada correctamente
*/
