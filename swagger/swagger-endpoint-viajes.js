/**
 * @swagger
 * tags:
 *   name: Viajes
 *   description: Endpoints para la gestión de viajes
 */

 /**
  * @swagger
  * /viajes/mostrarTodosLosViajes:
  *   get:
  *     tags:
  *       - Viajes
  *     summary: Obtener todos los viajes
  *     description: Retorna una lista con todos los viajes registrados.
  *     responses:
  *       200:
  *         description: Lista completa de viajes
  */

 /**
  * @swagger
  * /viajes/mostrarViaje/{id}:
  *   get:
  *     tags:
  *       - Viajes
  *     summary: Obtener un viaje por ID
  *     description: Devuelve la información del viaje correspondiente al ID proporcionado.
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         schema:
  *           type: integer
  *         example: 7
  *     responses:
  *       200:
  *         description: Información del viaje solicitado
  */

 /**
  * @swagger
  * /viajes/mostrarFiltroViaje/{ciudad_origen_id}/{ciudad_destino_id}:
  *   get:
  *     tags:
  *       - Viajes
  *     summary: Obtener viajes filtrados por ciudad de origen y destino
  *     description: Filtra los viajes basados en los IDs de ciudad de origen y destino.
  *     parameters:
  *       - in: path
  *         name: ciudad_origen_id
  *         required: true
  *         schema:
  *           type: integer
  *         example: 3
  *       - in: path
  *         name: ciudad_destino_id
  *         required: true
  *         schema:
  *           type: integer
  *         example: 5
  *     responses:
  *       200:
  *         description: Lista de viajes filtrados
  */

 /**
  * @swagger
  * /viajes/crearViaje:
  *   post:
  *     tags:
  *       - Viajes
  *     summary: Crear un nuevo viaje
  *     description: Registra un nuevo viaje en el sistema.
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             required:
  *               - usuario_id
  *               - ciudad_origen_id
  *               - ciudad_destino_id
  *               - fecha_salida
  *               - fecha_llegada
  *               - total_pagado
  *               - estado
  *             properties:
  *               usuario_id:
  *                 type: integer
  *                 example: 1
  *               ciudad_origen_id:
  *                 type: integer
  *                 example: 3
  *               ciudad_destino_id:
  *                 type: integer
  *                 example: 6
  *               hotel_id:
  *                 type: integer
  *                 nullable: true
  *                 example: 2
  *               transporte_id:
  *                 type: integer
  *                 nullable: true
  *                 example: 1
  *               fecha_salida:
  *                 type: string
  *                 format: date-time
  *                 example: "2025-01-15 08:00:00"
  *               fecha_llegada:
  *                 type: string
  *                 format: date-time
  *                 example: "2025-01-15 12:30:00"
  *               total_pagado:
  *                 type: number
  *                 format: float
  *                 example: 1500.00
  *               estado:
  *                 type: string
  *                 example: "Pendiente"
  *     responses:
  *       201:
  *         description: Viaje creado exitosamente
  */

 /**
  * @swagger
  * /viajes/actualizarViaje:
  *   put:
  *     tags:
  *       - Viajes
  *     summary: Actualizar un viaje existente
  *     description: Actualiza la información de un viaje mediante los datos proporcionados.
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             required:
  *               - id
  *               - usuario_id
  *               - ciudad_origen_id
  *               - ciudad_destino_id
  *               - fecha_salida
  *               - fecha_llegada
  *               - total_pagado
  *               - estado
  *             properties:
  *               id:
  *                 type: integer
  *                 example: 10
  *               usuario_id:
  *                 type: integer
  *                 example: 1
  *               ciudad_origen_id:
  *                 type: integer
  *                 example: 2
  *               ciudad_destino_id:
  *                 type: integer
  *                 example: 4
  *               hotel_id:
  *                 type: integer
  *                 nullable: true
  *                 example: 3
  *               transporte_id:
  *                 type: integer
  *                 nullable: true
  *                 example: 2
  *               fecha_salida:
  *                 type: string
  *                 format: date-time
  *                 example: "2025-04-20 09:00:00"
  *               fecha_llegada:
  *                 type: string
  *                 format: date-time
  *                 example: "2025-04-20 14:30:00"
  *               total_pagado:
  *                 type: number
  *                 format: float
  *                 example: 2000.00
  *               estado:
  *                 type: string
  *                 example: "Confirmado"
  *     responses:
  *       200:
  *         description: Viaje actualizado correctamente
  */

 /**
  * @swagger
  * /viajes/borrarViaje:
  *   delete:
  *     tags:
  *       - Viajes
  *     summary: Borrar un viaje
  *     description: Elimina un viaje mediante el ID enviado en el cuerpo.
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
  *                 example: 10
  *     responses:
  *       200:
  *         description: Viaje borrado correctamente
  */
