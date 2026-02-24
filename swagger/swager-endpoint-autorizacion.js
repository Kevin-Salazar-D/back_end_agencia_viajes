/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Endpoints para la gestión de autenticación de usuarios
 *
 * /autenticacion/registro:
 *   post:
 *     tags:
 *       - Autenticación
 *     summary: Inicia sesión de un usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - contra
 *             properties:
 *               usuario:
 *                 type: string
 *                 example: "kevin123"
 *               correo:
 *                 type: string
 *                 example: "kevin@email.com"
 *               contra:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Usuario autenticado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Has accedido correctamente a tu cuenta"
 *                 usuario:
 *                   type: object
 *                   description: Información básica del usuario autenticado
 *       401:
 *         description: Credenciales inválidas
 *
 * /autenticacion/crearCuenta:
 *   post:
 *     tags:
 *       - Autenticación
 *     summary: Crea una nueva cuenta de usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuario
 *               - correo
 *               - contra
 *               - nombre
 *               - apellido
 *               - telefono
 *             properties:
 *               usuario:
 *                 type: string
 *                 example: "kevin123"
 *               correo:
 *                 type: string
 *                 example: "kevin@email.com"
 *               contra:
 *                 type: string
 *                 example: "123456"
 *               nombre:
 *                 type: string
 *                 example: "Kevin"
 *               apellido:
 *                 type: string
 *                 example: "Duarte"
 *               telefono:
 *                 type: string
 *                 example: "3312345678"
 *     responses:
 *       201:
 *         description: Cuenta creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cuenta creada correctamente"
 *                 usuario:
 *                   type: object
 *                   description: Información básica del usuario registrado
 *       400:
 *         description: Datos inválidos o usuario ya existente
 *
 * /autenticacion/cerrarSesion:
 *   post:
 *     tags:
 *       - Autenticación
 *     summary: Cierra la sesión del usuario autenticado
 *     responses:
 *       200:
 *         description: Sesión cerrada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cuenta cerrada correctamente"
 *       401:
 *         description: Usuario no autenticado
 *
 * /autenticacion/verificarAuth2FA:
 *   post:
 *     tags:
 *       - Autenticación
 *     summary: Verifica el código de autenticación en dos pasos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - codigo
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               codigo:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Código verificado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Has accedido correctamente a tu cuenta"
 *                 usuario:
 *                   type: object
 *                   description: Información básica del usuario autenticado
 *       401:
 *         description: Código inválido o usuario no autorizado
 *
 * /autenticacion/activarDosPasos:
 *   post:
 *     tags:
 *       - Autenticación
 *     summary: Genera el código QR para activar autenticación en dos pasos
 *     responses:
 *       200:
 *         description: QR generado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "QR creado correctamente"
 *                 qr:
 *                   type: string
 *                   description: Imagen QR en formato base64
 *       401:
 *         description: Usuario no autenticado
 *
 * /autenticacion/confirmarDosPasos:
 *   post:
 *     tags:
 *       - Autenticación
 *     summary: Confirma la activación del 2FA con el código generado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - codigo
 *             properties:
 *               codigo:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Autenticación en dos pasos activada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Autorizacion creada correctamente"
 *       401:
 *         description: Código inválido o usuario no autenticado
 */