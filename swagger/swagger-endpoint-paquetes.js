/**
 * @swagger
 * tags:
 *   name: Paquetes
 *   description: Endpoints para la gestión de paquetes
 */

/**
 * @swagger
 * /paquetes/mostrarTodosPaquetes:
 *   get:
 *     tags:
 *       - Paquetes
 *     summary: Obtener todos los paquetes
 *     description: Retorna una lista con todos los paquetes registrados.
 *     responses:
 *       200:
 *         description: Lista completa de paquetes
 */

/**
 * @swagger
 * /paquetes/mostrarPaquete/{id}:
 *   get:
 *     tags:
 *       - Paquetes
 *     summary: Obtener un paquete por ID
 *     description: Devuelve la información del paquete correspondiente al ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Información del paquete solicitado
 */

/**
 * @swagger
 * /paquetes/mostrarPaquetesPorHotel/{hotel_id}:
 *   get:
 *     tags:
 *       - Paquetes
 *     summary: Obtener paquetes filtrados por hotel
 *     description: Retorna todos los paquetes que pertenecen a un hotel específico mediante su ID.
 *     parameters:
 *       - in: path
 *         name: hotel_id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 13
 *     responses:
 *       200:
 *         description: Lista de paquetes del hotel
 */

/**
 * @swagger
 * /paquetes/crearPaquete:
 *   post:
 *     tags:
 *       - Paquetes
 *     summary: Crear un nuevo paquete
 *     description: Registra un nuevo paquete en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - transporte_id
 *               - ciudad_id
 *               - tipo_paquete
 *               - descripcion
 *               - precio
 *               - fecha_inicio
 *               - fecha_fin
 *               - tiempo_estadia
 *               - hotel_id
 *             properties:
 *               transporte_id:
 *                 type: integer
 *                 example: 2
 *               ciudad_id:
 *                 type: integer
 *                 example: 3
 *               hotel_id:
 *                 type: integer
 *                 example: 13
 *               tipo_paquete:
 *                 type: string
 *                 example: "Guadalajara Express"
 *               descripcion:
 *                 type: string
 *                 example: "Escapada turística con hospedaje en el Hotel Riu Plaza Guadalajara."
 *               precio:
 *                 type: number
 *                 example: 749.00
 *               fecha_inicio:
 *                 type: string
 *                 example: "2026-03-15"
 *               fecha_fin:
 *                 type: string
 *                 example: "2026-03-18"
 *               tiempo_estadia:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       201:
 *         description: Paquete creado exitosamente
 */

/**
 * @swagger
 * /paquetes/actualizarPaquete:
 *   put:
 *     tags:
 *       - Paquetes
 *     summary: Actualizar un paquete existente
 *     description: Actualiza la información de un paquete mediante los datos proporcionados.
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
 *               transporte_id:
 *                 type: integer
 *                 example: 2
 *               ciudad_id:
 *                 type: integer
 *                 example: 3
 *               hotel_id:
 *                 type: integer
 *                 example: 13
 *               tipo_paquete:
 *                 type: string
 *                 example: "Guadalajara Express Actualizado"
 *               descripcion:
 *                 type: string
 *                 example: "Paquete actualizado con transporte en avión."
 *               precio:
 *                 type: number
 *                 example: 799.00
 *               fecha_inicio:
 *                 type: string
 *                 example: "2026-03-16"
 *               fecha_fin:
 *                 type: string
 *                 example: "2026-03-19"
 *               tiempo_estadia:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Paquete actualizado correctamente
 */

/**
 * @swagger
 * /paquetes/borrarPaquete:
 *   delete:
 *     tags:
 *       - Paquetes
 *     summary: Borrar un paquete
 *     description: Elimina un paquete mediante el ID enviado en el cuerpo.
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
 *     responses:
 *       200:
 *         description: Paquete borrado correctamente
 */
