/**
 * @swagger
 * tags:
 *   name: HotelDetalles
 *   description: Endpoints para la gestión de detalles de hoteles
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     DetalleHotel:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del detalle del hotel
 *         hotel_id:
 *           type: integer
 *           description: ID del hotel relacionado
 *         descripcion:
 *           type: string
 *         amenidades:
 *           type: string
 *         total_resenas:
 *           type: integer
 *         politicas:
 *           type: string
 *         check_in:
 *           type: string
 *         check_out:
 *           type: string
 *         cancelacion:
 *           type: string
 *         retricciones:
 *           type: string
 *         precio_noche:
 *           type: number
 */

/* ============================================================
   GET → Mostrar todos los detalles de hoteles
   /hotelDetalles/mostrarTodosDetallesHoteles
   ============================================================ */
/**
 * @swagger
 * /hotelDetalles/mostrarTodosDetallesHoteles:
 *   get:
 *     summary: Obtiene todos los detalles de todos los hoteles
 *     tags: [HotelDetalles]
 *     responses:
 *       200:
 *         description: Lista de detalles de hoteles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DetalleHotel'
 *       500:
 *         description: Error interno del servidor
 */


/* ============================================================
   GET → Mostrar detalles de un hotel por ID (params)
   /hotelDetalles/mostrarDetallesDeUnHotel/{hotel_id}
   ============================================================ */
/**
 * @swagger
 * /hotelDetalles/mostrarDetallesDeUnHotel/{hotel_id}:
 *   get:
 *     summary: Obtiene los detalles de un hotel por su ID
 *     tags: [HotelDetalles]
 *     parameters:
 *       - in: path
 *         name: hotel_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del hotel cuyos detalles se desean obtener
 *     responses:
 *       200:
 *         description: Detalles del hotel encontrados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DetalleHotel'
 *       404:
 *         description: No se encontró el detalle del hotel
 *       500:
 *         description: Error interno del servidor
 */


/* ============================================================
   POST → Crear detalles de un hotel
   /hotelDetalles/crearDetallesHotel
   ============================================================ */
/**
 * @swagger
 * /hotelDetalles/crearDetallesHotel:
 *   post:
 *     summary: Crea los detalles adicionales de un hotel
 *     tags: [HotelDetalles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - hotel_id
 *               - descripcion
 *               - amenidades
 *               - total_resenas
 *               - politicas
 *               - check_in
 *               - check_out
 *               - cancelacion
 *               - retricciones
 *               - precio_noche
 *             properties:
 *               hotel_id: { type: integer }
 *               descripcion: { type: string }
 *               amenidades: { type: string }
 *               total_resenas: { type: integer }
 *               politicas: { type: string }
 *               check_in: { type: string }
 *               check_out: { type: string }
 *               cancelacion: { type: string }
 *               retricciones: { type: string }
 *               precio_noche: { type: number }
 *     responses:
 *       201:
 *         description: Detalles creados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 detalleID:
 *                   type: integer
 *       400:
 *         description: Faltan datos obligatorios
 *       500:
 *         description: Error al crear los detalles
 */


/* ============================================================
   PUT → Actualizar detalles de un hotel
   /hotelDetalles/actualizarDetallesHotel
   ============================================================ */
/**
 * @swagger
 * /hotelDetalles/actualizarDetallesHotel:
 *   put:
 *     summary: Actualiza los detalles de un hotel
 *     tags: [HotelDetalles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id: { type: integer }
 *               hotel_id: { type: integer }
 *               descripcion: { type: string }
 *               amenidades: { type: string }
 *               total_resenas: { type: integer }
 *               politicas: { type: string }
 *               check_in: { type: string }
 *               check_out: { type: string }
 *               cancelacion: { type: string }
 *               retricciones: { type: string }
 *               precio_noche: { type: number }
 *     responses:
 *       200:
 *         description: Detalles actualizados correctamente
 *       404:
 *         description: No se encontró el registro
 *       500:
 *         description: Error interno del servidor
 */


/* ============================================================
   DELETE → Borrar detalle por ID (query param)
   /hotelDetalles/borrarDetalleHotel?id=
   ============================================================ */
/**
 * @swagger
 * /hotelDetalles/borrarDetalleHotel:
 *   delete:
 *     summary: Elimina un detalle de hotel mediante su ID
 *     tags: [HotelDetalles]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del detalle del hotel a eliminar
 *     responses:
 *       200:
 *         description: Detalle eliminado correctamente
 *       404:
 *         description: No se encontró el detalle
 *       500:
 *         description: Error interno del servidor
 */
