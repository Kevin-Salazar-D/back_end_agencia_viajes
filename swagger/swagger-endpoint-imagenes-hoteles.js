/**
 * @swagger
 * tags:
 *   name: ImagenesHoteles
 *   description: Endpoints para la gestión de imágenes de hoteles
 *
 * /hotelImagenes/mostrarImagenHotel:
 *   get:
 *     tags:
 *       - ImagenesHoteles
 *     summary: Obtiene todas las imágenes de un hotel
 *     parameters:
 *       - in: query
 *         name: hotel_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del hotel
 *     responses:
 *       200:
 *         description: Lista de imágenes del hotel
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   hotel_id:
 *                     type: integer
 *                   url:
 *                     type: string
 *                   tipo:
 *                     type: string
 *                     example: "galeria"
 *                   orden:
 *                     type: integer
 *
 * /hotelImagenes/crearImagenHotel:
 *   post:
 *     tags:
 *       - ImagenesHoteles
 *     summary: Crea una nueva imagen asociada a un hotel
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - hotel_id
 *               - url
 *             properties:
 *               hotel_id:
 *                 type: integer
 *                 example: 3
 *               url:
 *                 type: string
 *                 example: "https://miweb.com/imagen01.jpg"
 *               orden:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Imagen creada exitosamente
 *
 * /hotelImagenes/actualizarImagenHotel:
 *   put:
 *     tags:
 *       - ImagenesHoteles
 *     summary: Actualiza los datos de una imagen de hotel
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               url:
 *                 type: string
 *                 example: "https://miweb.com/nueva_img.jpg"
 *               tipo:
 *                 type: string
 *                 example: "galeria"
 *               orden:
 *                 type: integer
 *                 example: 2
 * 
 *               hotel_id:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Imagen actualizada exitosamente
 *
 * /hotelImagenes/borrarImagenHotel:
 *   delete:
 *     tags:
 *       - ImagenesHoteles
 *     summary: Elimina una imagen de hotel por ID
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
 *                 example: 5
 *     responses:
 *       200:
 *         description: Imagen eliminada correctamente
 */
