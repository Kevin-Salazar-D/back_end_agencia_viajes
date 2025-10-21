/**
 * @swagger
 * /transporte/obtenerTodosTransportes:
 *   get:
 *     tags:
 *       - Transporte
 *     summary: Obtiene todos los transportes
 *     description: Retorna una lista con todos los transportes disponibles.
 *     responses:
 *       200:
 *         description: Lista de transportes obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transporte'
 *       500:
 *         description: Error interno del servidor
 *
 * /transporte/crearTransporte:
 *   post:
 *     tags:
 *       - Transporte
 *     summary: Crea un nuevo transporte
 *     description: Permite registrar un nuevo transporte en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tipo
 *               - capacidad
 *             properties:
 *               tipo:
 *                 type: string
 *                 example: "Avión"
 *               capacidad:
 *                 type: integer
 *                 example: 180
 *               matricula:
 *                 type: string
 *                 example: "EC-GHI"
 *               disponible:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Transporte creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transporte'
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 *
 * components:
 *   schemas:
 *     Transporte:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "615c1234abcd5678"
 *         tipo:
 *           type: string
 *           example: "Avión"
 *         capacidad:
 *           type: integer
 *           example: 180
 *         matricula:
 *           type: string
 *           example: "EC-GHI"
 *         disponible:
 *           type: boolean
 *           example: true
 */