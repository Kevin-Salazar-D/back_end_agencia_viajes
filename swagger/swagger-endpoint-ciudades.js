/**
 * @swagger
 * tags:
 *   name: Ciudades
 *   description: Endpoints para la gestión de ciudades
 *
 * /ciudades/obtenerTodasCiudades:
 *   get:
 *     tags:
 *       - Ciudades
 *     summary: Obtiene todas las ciudades registradas
 *     responses:
 *       200:
 *         description: Lista de ciudades
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
 *                   nombre:
 *                     type: string
 *                     example: "Tokyo"
 *                   pais:
 *                     type: string
 *                     example: "Japón"
 *                   region:
 *                     type: string
 *                     example: "Kanto"
 *                   codigo_postal:
 *                     type: string
 *                     example: "100-0001"
 *
 * /ciudades/crearCiudad:
 *   post:
 *     tags:
 *       - Ciudades
 *     summary: Crea una nueva ciudad
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - pais
 *               - region
 *               - codigo_postal
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Tokyo"
 *               pais:
 *                 type: string
 *                 example: "Japón"
 *               region:
 *                 type: string
 *                 example: "Kanto"
 *               codigo_postal:
 *                 type: string
 *                 example: "100-0001"
 *     responses:
 *       201:
 *         description: Ciudad creada exitosamente
 *
 * /ciudades/actualizarCiudad:
 *   put:
 *     tags:
 *       - Ciudades
 *     summary: Actualiza los datos de una ciudad existente
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
 *                 example: "Tokyo"
 *               pais:
 *                 type: string
 *                 example: "Japón"
 *               region:
 *                 type: string
 *                 example: "Kanto"
 *               codigo_postal:
 *                 type: string
 *                 example: "100-0002"
 *     responses:
 *       200:
 *         description: Ciudad actualizada exitosamente
 *
 * /ciudades/borrarCiudad:
 *   delete:
 *     tags:
 *       - Ciudades
 *     summary: Borra una ciudad por ID
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
 *         description: Ciudad eliminada exitosamente
 */
