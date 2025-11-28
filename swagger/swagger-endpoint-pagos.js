/**
 * @swagger
 * tags:
 *   name: Pagos
 *   description: Endpoints para la gestión de pagos
 */

/**
 * @swagger
 * /pagos/mostrarTodosPagos:
 *   get:
 *     tags:
 *       - Pagos
 *     summary: Obtener todos los pagos registrados
 *     description: Devuelve una lista con toda la información de los pagos realizados.
 *     responses:
 *       200:
 *         description: Lista completa de pagos
 */

/**
 * @swagger
 * /pagos/mostrarPagoPorFolio/{folio}:
 *   get:
 *     tags:
 *       - Pagos
 *     summary: Buscar un pago mediante el folio
 *     description: Devuelve la información completa de un pago según su folio.
 *     parameters:
 *       - in: path
 *         name: folio
 *         required: true
 *         schema:
 *           type: string
 *         example: "PAY-9A82JS"
 *     responses:
 *       200:
 *         description: Información del pago solicitado
 */

/**
 * @swagger
 * /pagos/mostrarPagoPorReservacion/{reservacion_id}:
 *   get:
 *     tags:
 *       - Pagos
 *     summary: Buscar un pago por ID de reservación
 *     description: Devuelve información del pago asociado a una reservación específica.
 *     parameters:
 *       - in: path
 *         name: reservacion_id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 23
 *     responses:
 *       200:
 *         description: Información del pago asociado
 */

/**
 * @swagger
 * /pagos/crearPago:
 *   post:
 *     tags:
 *       - Pagos
 *     summary: Registrar un nuevo pago
 *     description: Crea un nuevo pago en el sistema. No requiere usuario ni paquete obligatoriamente.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - precio_final
 *               - numero_tarjeta
 *               - cvv
 *             properties:
 *               usuario_id:
 *                 type: integer
 *                 example: 5
 *               paquete_id:
 *                 type: integer
 *                 example: 13
 *               reservacion_id:
 *                 type: integer
 *                 example: 22
 *               precio_final:
 *                 type: number
 *                 format: float
 *                 example: 1249.50
 *               numero_tarjeta:
 *                 type: string
 *                 example: "4111111111111111"
 *               cvv:
 *                 type: string
 *                 example: "123"
 *     responses:
 *       201:
 *         description: Pago registrado exitosamente
 */

/**
 * @swagger
 * /pagos/actualizarPago:
 *   put:
 *     tags:
 *       - Pagos
 *     summary: Actualizar información de un pago mediante el folio
 *     description: Actualiza el estatus o precio final de un pago registrado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - folio
 *             properties:
 *               folio:
 *                 type: string
 *                 example: "PAY-9A82JS"
 *               precio_final:
 *                 type: number
 *                 example: 1499.00
 *               estatus:
 *                 type: integer
 *                 description: 0 = Pendiente, 1 = Completado, 2 = Fallido
 *                 example: 1
 *     responses:
 *       200:
 *         description: Pago actualizado correctamente
 */

/**
 * @swagger
 * /pagos/borrarPago:
 *   delete:
 *     tags:
 *       - Pagos
 *     summary: Borrar un pago por ID
 *     description: Elimina un pago de la base de datos mediante el ID enviado.
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
 *                 example: 15
 *     responses:
 *       200:
 *         description: Pago eliminado correctamente
 */
