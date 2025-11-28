/**
 * @swagger
 * tags:
 *   name: Transportes
 *   description: Endpoints para la gestión de transportes
 *
 * /transportes/obtenerTodosTransportes:
 *   get:
 *     tags:
 *       - Transportes
 *     summary: Obtiene todos los transportes registrados
 *     responses:
 *       200:
 *         description: Lista de transportes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   tipo:
 *                     type: string
 *                   nombre:
 *                     type: string
 *                   modelo:
 *                     type: string
 *                   capacidad:
 *                     type: integer
 *                   asientos_disponibles:
 *                     type: integer
 *                   estatus:
 *                     type: integer
 *
 * /transportes/buscarTransportePorTipo:
 *   get:
 *     tags:
 *       - Transportes
 *     description: Obtiene todos los transportes de un tipo específico
 *     parameters:
 *       - in: query
 *         name: tipo
 *         required: true
 *         schema:
 *           type: string
 *         description: Tipo de transporte (por ejemplo, "camion" o "avion")
 *     responses:
 *       200:
 *         description: Lista de transportes del tipo solicitado
 *
 * /transportes/crearTransporte:
 *   post:
 *     tags:
 *       - Transportes
 *     summary: Crea un nuevo transporte
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tipo
 *               - nombre
 *               - modelo
 *               - capacidad
 *               - asientos_disponibles
 *               - precio
 *             properties:
 *               tipo:
 *                 type: string
 *                 example: "camion"
 *               nombre:
 *                 type: string
 *                 example: "Mercedes Benz"
 *               modelo:
 *                 type: string
 *                 example: "Sprinter 2024"
 *               capacidad:
 *                 type: integer
 *                 example: 20
 *               precio:
 *                 type: integer
 *                 example: 100
 *               asientos_disponibles:
 *                 type: integer
 *                 example: 18
 *     responses:
 *       201:
 *         description: Transporte creado exitosamente
 *
 * /transportes/actualizarTransporte:
 *   put:
 *     tags:
 *       - Transportes
 *     summary: Actualiza los datos de un transporte existente
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
 *               tipo:
 *                 type: string
 *                 example: "avion"
 *               nombre:
 *                 type: string
 *                 example: "Boeing"
 *               modelo:
 *                 type: string
 *                 example: "737 MAX"
 *               capacidad:
 *                 type: integer
 *                 example: 150
 *               precio:
 *                 type: integer
 *                 example: 100
 *               asientos_disponibles:
 *                 type: integer
 *                 example: 145
 *     responses:
 *       200:
 *         description: Transporte actualizado exitosamente
 *
 * /transportes/eliminarTransporte:
 *   delete:
 *     tags:
 *       - Transportes
 *     summary: Borra un transporte por ID
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
 *         description: Transporte eliminado correctamente
 *
 * /transportes/buscarTransportePorId:
 *   get:
 *     tags:
 *       - Transportes
 *     description: Obtiene un transporte específico según su ID
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del transporte
 *     responses:
 *       200:
 *         description: Transporte encontrado exitosamente
 */
