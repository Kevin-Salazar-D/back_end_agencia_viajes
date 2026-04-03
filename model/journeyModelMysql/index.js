import conexionMysql from "../../config/mysql.js";
import validarErrorModelo from "../../utils/validarErrorModelo.js";

const mysqlCliente = conexionMysql;

// Crear Viaje
const crearViaje = async (viajeData) => {
  try {
    const sqlQuery = `
      INSERT INTO viajes 
      (usuario_id, ciudad_origen_id, ciudad_destino_id, hotel_id, transporte_id, fecha_salida, fecha_llegada, total_pagado, estado)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await mysqlCliente.query(sqlQuery, [
      viajeData.usuario_id,
      viajeData.ciudad_origen_id,
      viajeData.ciudad_destino_id,
      viajeData.hotel_id,
      viajeData.transporte_id,
      viajeData.fecha_salida,
      viajeData.fecha_llegada,
      viajeData.total_pagado,
      viajeData.estado,
    ]);

    return result.insertId;
  } catch (error) {
    validarErrorModelo(error, "Error al crear viaje. Transporte o ciudad inválido.");
    throw error;
  }
};

// Actualizar viaje
const actualizarViaje = async (viajeData) => {
  try {
    const sqlQuery = `
      UPDATE viajes
      SET usuario_id = ?, ciudad_origen_id = ?, ciudad_destino_id = ?, hotel_id = ?, transporte_id = ?, 
        fecha_salida = ?, fecha_llegada = ?, total_pagado = ?, estado = ?
      WHERE id = ?
    `;

    const [result] = await mysqlCliente.query(sqlQuery, [
      viajeData.usuario_id,
      viajeData.ciudad_origen_id,
      viajeData.ciudad_destino_id,
      viajeData.hotel_id,
      viajeData.transporte_id,
      viajeData.fecha_salida,
      viajeData.fecha_llegada,
      viajeData.total_pagado,
      viajeData.estado,
      viajeData.id,
    ]);

    return result.affectedRows;
  } catch (error) {
        validarErrorModelo(error, "Error al actulizar el viaje. Hora y fecha incorrecta.");

    throw error;
  }
};

// Mostrar viajes filtrados
const mostrarFiltroViaje = async (ciudad_origen_id, ciudad_destino_id) => {
  try {
    const sqlQuery = `
      SELECT 
        v.id AS viaje_id,
        v.fecha_salida,
        v.fecha_llegada,
        t.tipo AS tipo_transporte,
        t.nombre AS nombre_transporte,

        c1.nombre AS ciudad_origen,
        c2.nombre AS ciudad_destino,

        h.id AS hotel_id,
        h.nombre AS hotel_nombre,
        h.direccion AS hotel_direccion,
        h.estrellas AS hotel_estrellas,
        h.telefono AS hotel_telefono,
        h.imagen AS hotel_imagen

      FROM viajes v
      LEFT JOIN transporte t ON v.transporte_id = t.id  
      JOIN ciudades c1 ON v.ciudad_origen_id = c1.id
      JOIN ciudades c2 ON v.ciudad_destino_id = c2.id
      LEFT JOIN hoteles h ON h.ciudad_id = v.ciudad_destino_id
      WHERE v.ciudad_origen_id = ?
      AND v.ciudad_destino_id = ?;
    `;

    const [rows] = await mysqlCliente.query(sqlQuery, [
      ciudad_origen_id,
      ciudad_destino_id,
    ]);

    return rows;
  } catch (error) {
    console.error("Error mostrando el viaje:", error);
    throw error;
  }
};
//muestra un viaje por id
const mostrarViajeID = async (id) => {
  try {
    const sqlQuery = `
      SELECT 
        v.id, v.usuario_id, v.ciudad_origen_id, v.ciudad_destino_id, v.hotel_id, v.transporte_id, 
        v.fecha_salida, v.fecha_llegada, v.total_pagado, v.estado,
        t.tipo AS tipo_transporte,
        t.nombre AS nombre_transporte,
        u.nombre AS nombre_usuario,
        c1.nombre AS ciudad_origen,
        c2.nombre AS ciudad_destino
      FROM viajes v
      JOIN usuarios u ON v.usuario_id = u.id
      LEFT JOIN transporte t ON v.transporte_id = t.id
      JOIN ciudades c1 ON v.ciudad_origen_id = c1.id
      JOIN ciudades c2 ON v.ciudad_destino_id = c2.id
      LEFT JOIN hoteles h ON v.hotel_id = h.id
      WHERE v.id = ?
    `;

    const [rows] = await mysqlCliente.query(sqlQuery, [id]);
    return rows[0];
  } catch (error) {
    console.error("Error obteniendo viaje:", error);
    throw error;
  }
};

//mostrar todos los viajes 
const mostrarTodosLosViajes = async () => {
  try {
    const sqlQuery = `
      SELECT 
        v.id, v.fecha_salida, v.fecha_llegada,
        t.nombre AS transporte, 
        c1.nombre AS ciudad_origen,
        c2.nombre AS ciudad_destino,
        h.nombre AS hotel
      FROM viajes v
      LEFT JOIN transporte t ON v.transporte_id = t.id
      JOIN ciudades c1 ON v.ciudad_origen_id = c1.id
      JOIN ciudades c2 ON v.ciudad_destino_id = c2.id
      LEFT JOIN hoteles h ON v.hotel_id = h.id
      ORDER BY v.id DESC;
    `;

    const [rows] = await mysqlCliente.query(sqlQuery);
    return rows;
  } catch (error) {
    console.error("Error obteniendo viajes:", error);
    throw error;
  }
};

// Borrar viaje
const borrarViaje = async (id) => {
  try {
    const sqlQuery = `
      DELETE FROM viajes
      WHERE id = ?
    `;

    const [result] = await mysqlCliente.query(sqlQuery, [id]);
    return result.affectedRows;
  } catch (error) {
    console.error("Error borrando el viaje:", error);
    throw error;
  }
};

export default {
  crearViaje,
  actualizarViaje,
  mostrarFiltroViaje,
  mostrarViajeID,
  borrarViaje,
  mostrarTodosLosViajes
};
