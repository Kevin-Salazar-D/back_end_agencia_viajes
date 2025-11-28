import conexionMysql from "../../config/mysql.js";
import validarErrorModelo from "../../utils/validarErrorModelo.js";
const mysqlCliente = conexionMysql;

// Crear reservacion
const crearReservacion = async (reservacionData) => {
  try {
    const sqlQuery = `
      INSERT INTO reservaciones 
      (usuario_id, numero_reserva, paquete_id, habitacion_id, fecha_reserva, fecha_entrada, fecha_salida, estatus)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const [result] = await mysqlCliente.query(sqlQuery, [
      reservacionData.usuario_id || null,
      reservacionData.numero_reserva || "RES-" + Date.now(), // valor predeterminado
      reservacionData.paquete_id || null,
      reservacionData.habitacion_id,
      reservacionData.fecha_reserva,
      reservacionData.fecha_entrada ,
      reservacionData.fecha_salida ,
      reservacionData.estatus || 0
    ]);

    return result.insertId;
  } catch (error) {
    validarErrorModelo(error, "Error al crear la reservación. No se encontró la habitación.");
    throw error;
  }
};

// Actualizar reservacion
const actualizarReservacion = async (reservacionData) => {
  try {
    const sqlQuery = `
      UPDATE reservaciones
      SET usuario_id = ?, paquete_id = ?, 
          habitacion_id = ?, fecha_reserva = ?, fecha_entrada = ?, 
          fecha_salida = ?, estatus = ?
      WHERE numero_reserva = ?
    `;

    const [result] = await mysqlCliente.query(sqlQuery, [
      reservacionData.usuario_id || null,
      reservacionData.paquete_id || null,
      reservacionData.habitacion_id ,
      reservacionData.fecha_reserva,
      reservacionData.fecha_entrada,
      reservacionData.fecha_salida,
      reservacionData.estatus || "Pendiente",
      reservacionData.numero_reserva
    ]);

    return result.affectedRows;
  } catch (error) {
    console.error("Error no se pudo actualizar la reservación");
    throw error;
  }
};

// Mostrar reservación por numero_reserva
const mostrarReservacion = async (numero_reserva) => {
  try {
    const sqlQuery = `
      SELECT 
         r.id AS reservacion_id,
        r.numero_reserva,
        r.fecha_entrada,
        r.fecha_salida,
        r.estatus AS reservacion_estatus,
        h.numero_habitacion,
        h.tipo_habitacion,
        p.tipo_paquete,
        p.descripcion AS nombre_paquete,
        u.nombre AS nombre_usuario,
        u.usuario AS username
      FROM reservaciones r
      LEFT JOIN habitaciones h ON r.habitacion_id = h.id
      LEFT JOIN paquetes p ON r.paquete_id = p.id
      LEFT JOIN usuarios u ON r.usuario_id = u.id
      WHERE r.numero_reserva = ?
    `;
    const [rows] = await mysqlCliente.query(sqlQuery, [numero_reserva]);
    return rows[0]
  } catch (error) {
    console.error("Error mostrando reservación:", error);
    throw error;
  }
};

// Mostrar todas las reservaciones
const mostrarTodasReservaciones = async () => {
  try {
    const sqlQuery = `
      SELECT 
        r.id AS reservacion_id,
        r.numero_reserva,
        r.fecha_entrada,
        r.fecha_salida,
        r.estatus AS reservacion_estatus,
        
        h.numero_habitacion,
        h.tipo_habitacion,
        
        p.tipo_paquete,
        p.descripcion AS nombre_paquete,
        
        u.nombre AS nombre_usuario,
        u.usuario AS username
      FROM reservaciones r
      LEFT JOIN habitaciones h ON r.habitacion_id = h.id
      LEFT JOIN paquetes p ON r.paquete_id = p.id
      LEFT JOIN usuarios u ON r.usuario_id = u.id
      ORDER BY r.fecha_reserva DESC
    `;
    const [rows] = await mysqlCliente.query(sqlQuery);
    return rows;
  } catch (error) {
    console.error("Error mostrando todas las reservaciones:", error);
    throw error;
  }
};

// Borrar reservación por numero_reserva
const borrarReservacion = async (numero_reserva) => {
  try {
    const sqlQuery = `DELETE FROM reservaciones WHERE numero_reserva = ?`;
    const [result] = await mysqlCliente.query(sqlQuery, [numero_reserva]);
    return result.affectedRows; 
  } catch (error) {
    console.error("Error borrando la reservación por numero_reserva:", error);
    throw error;
  }
};

// Exportar funciones
export default {
  crearReservacion,
  actualizarReservacion,
  mostrarReservacion,
  mostrarTodasReservaciones,
  borrarReservacion
};
