import conexionMysql from "../../config/mysql.js";
import validarErrorModelo from "../../utils/validarErrorModelo.js";

const mysqlCliente = conexionMysql;

// Crear Viaje
const crearViaje = async (viajeData) => {
  try {
    const sqlQuery = `
      INSERT INTO viaje 
      (tipo_transporte_id, fecha_salida, fecha_llegada, origen_ciudad_id, destino_ciudad_id, numero_transporte)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await mysqlCliente.query(sqlQuery, [
      viajeData.tipo_transporte_id,
      viajeData.fecha_salida,
      viajeData.fecha_llegada,
      viajeData.origen_ciudad_id,
      viajeData.destino_ciudad_id,
      viajeData.numero_transporte,
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
      UPDATE viaje
      SET tipo_transporte_id = ?, fecha_salida = ?, fecha_llegada = ?, 
          origen_ciudad_id = ?, destino_ciudad_id = ?, numero_transporte = ?
      WHERE id = ?
    `;

    const [result] = await mysqlCliente.query(sqlQuery, [
      viajeData.tipo_transporte_id,
      viajeData.fecha_salida,
      viajeData.fecha_llegada,
      viajeData.origen_ciudad_id,
      viajeData.destino_ciudad_id,
      viajeData.numero_transporte,
      viajeData.id,
    ]);

    return result.affectedRows;
  } catch (error) {
        validarErrorModelo(error, "Error al actulizar el viaje. Hora y fecha incorrecta.");

    throw error;
  }
};

// Mostrar viajes filtrados
const mostrarFiltroViaje = async (ciudad_origen, ciudad_destino) => {
  try {
    const sqlQuery = `
      SELECT 
        v.id AS viaje_id,
        v.fecha_salida,
        v.fecha_llegada,
        v.numero_transporte,
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

      FROM viaje v
      JOIN transporte t ON v.tipo_transporte_id = t.id
      JOIN ciudades c1 ON v.origen_ciudad_id = c1.id
      JOIN ciudades c2 ON v.destino_ciudad_id = c2.id
      LEFT JOIN hoteles h ON h.ciudad_id = v.destino_ciudad_id
      WHERE v.origen_ciudad_id = ?
      AND v.destino_ciudad_id = ?;
    `;

    const [rows] = await mysqlCliente.query(sqlQuery, [
      ciudad_origen,
      ciudad_destino,
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
        v.*, 
        t.tipo AS tipo_transporte,
        t.nombre AS nombre_transporte,
        c1.nombre AS ciudad_origen,
        c2.nombre AS ciudad_destino
      FROM viaje v
      JOIN transporte t ON v.tipo_transporte_id = t.id
      JOIN ciudades c1 ON v.origen_ciudad_id = c1.id
      JOIN ciudades c2 ON v.destino_ciudad_id = c2.id
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
        v.id, v.fecha_salida, v.fecha_llegada, v.numero_transporte,
        t.nombre AS transporte, 
        c1.nombre AS ciudad_origen,
        c2.nombre AS ciudad_destino
      FROM viaje v
      JOIN transporte t ON v.tipo_transporte_id = t.id
      JOIN ciudades c1 ON v.origen_ciudad_id = c1.id
      JOIN ciudades c2 ON v.destino_ciudad_id = c2.id
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
      DELETE FROM viaje
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
