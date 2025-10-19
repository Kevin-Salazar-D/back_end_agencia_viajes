/**
 * @swagger
 * tags:
 *   name: Hoteles
 *   description: Endpoints para la gestión de hoteles
 *
 * /hoteles/mostrarTodosHoteles:
 *   get:
 *     tags:
 *       - Hoteles
 *     summary: Obtiene todos los hoteles registrados
 *     responses:
 *       200:
 *         description: Lista de hoteles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *                   direccion:
 *                     type: string
 *                   estrellas:
 *                     type: integer
 *                   telefono:
 *                     type: string
 *                   ciudad_id:
 *                     type: integer
 *
 * /hoteles/mostrarHotelesCiudad:
 *   get:
 *     tags:
 *       - Hoteles
 *     description: Obtiene todos los hoteles de una ciudad específica
 *     parameters:
 *       - in: query
 *         name: ciudad_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la ciudad
 *     responses:
 *       200:
 *         description: Lista de hoteles de la ciudad
 *
 * /hoteles/crearHotel:
 *   post:
 *     tags:
 *       - Hoteles
 *     summary: Crea un nuevo hotel asociado a una ciudad
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ciudad_id
 *               - nombre
 *               - direccion
 *               - estrellas
 *               - telefono
 *             properties:
 *               ciudad_id:
 *                 type: integer
 *                 example: 1
 *               nombre:
 *                 type: string
 *                 example: "Hotel Sakura"
 *               direccion:
 *                 type: string
 *                 example: "Tokyo, Shibuya-ku, 5-12-3"
 *               estrellas:
 *                 type: integer
 *                 example: 5
 *               telefono:
 *                 type: string
 *                 example: "+81 3-1234-5678"
 *     responses:
 *       201:
 *         description: Hotel creado exitosamente
 *
 * /hoteles/actualizarHotel:
 *   put:
 *     tags:
 *       - Hoteles
 *     summary: Actualiza los datos de un hotel existente
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
 *                 example: 1
 *               nombre:
 *                 type: string
 *                 example: "Hotel Sakura Renovado"
 *               direccion:
 *                 type: string
 *                 example: "Tokyo, Chiyoda-ku, 2-4-6"
 *               estrellas:
 *                 type: integer
 *                 example: 4
 *               telefono:
 *                 type: string
 *                 example: "+81 3-9876-5432"
 *     responses:
 *       200:
 *         description: Hotel actualizado exitosamente
 *
 * /hoteles/actualizarCiudadIdHotel:
 *   put:
 *     tags:
 *       - Hoteles
 *     summary: Actualiza la ciudad asociada a un hotel
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - ciudad_id
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               ciudad_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Ciudad del hotel actualizada exitosamente
 *
 * /hoteles/borrarHotel:
 *   delete:
 *     tags:
 *       - Hoteles
 *     summary: Borra un hotel por ID
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
 *         description: Hotel eliminado correctamente
 */
