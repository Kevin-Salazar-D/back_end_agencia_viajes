import getConexionMysql from "../../config/mysql.js";

const conexionMysql = getConexionMysql;

// Crear habitación
const crearHabitacion = async (habitacionData) => {
  try {
    const sqlQuery = `
      INSERT INTO habitaciones (hotel_id, numero_habitacion, tipo_habitacion, estatus)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await conexionMysql.query(sqlQuery, [
      habitacionData.hotel_id,
      habitacionData.numero_habitacion,
      habitacionData.tipo_habitacion,
      habitacionData.estatus,
    ]);
    return result.insertId;
  } catch (error) {
    console.error("Error creando la habitación:", error);
  }
};

// Actualizar datos de habitación
const actualizarHabitacion = async (habitacionData) => {
  try {
    const sqlQuery = `
      UPDATE habitaciones
      SET numero_habitacion = ?, tipo_habitacion = ?, estatus = ?
      WHERE id = ?
    `;
    const [result] = await conexionMysql.query(sqlQuery, [
      habitacionData.numero_habitacion,
      habitacionData.tipo_habitacion,
      habitacionData.estatus,
      habitacionData.id,
    ]);
    return result.affectedRows;
  } catch (error) {
    console.error("Error actualizando la habitación:", error);
  }
};

// Actualizar el ID de hotel asociado a la habitación
const actualizarIdHabitacion = async (habitacionData) => {
  try {
    const sqlQuery = `
      UPDATE habitaciones
      SET hotel_id = ?
      WHERE id = ?
    `;
    const [result] = await conexionMysql.query(sqlQuery, [
      habitacionData.hotel_id,
      habitacionData.id,
    ]);
    return result.affectedRows;
  } catch (error) {
    console.error("Error actualizando el hotel_id de la habitación:", error);
  }
};

// Apartar habitación (cambiar estatus)
const apartarEstatusHabitacion = async (habitacionData) => {
  try {
    const sqlQuery = `
      UPDATE habitaciones
      SET estatus = ?
      WHERE id = ?
    `;
    const [result] = await conexionMysql.query(sqlQuery, [habitacionData.estatus, habitacionData.id]);
    return result.affectedRows;
  } catch (error) {
    console.error("Error actualizando el estatus de la habitación:", error);
  }
};

// Mostrar todas las habitaciones
const mostrarTodasHabitaciones = async () => {
  try {
    const sqlQuery = `SELECT * FROM habitaciones`;
    const [result] = await conexionMysql.query(sqlQuery);
    return result;
  } catch (error) {
    console.error("Error trayendo todas las habitaciones:", error);
  }
};

// Mostrar habitación por ID
const mostrarHabitacionID = async (hotelId) => {
  try {
    const sqlQuery = `
      SELECT * FROM habitaciones
      WHERE hotel_id = ?
    `;
    const [result] = await conexionMysql.query(sqlQuery, [hotelId]);
    return result;
  } catch (error) {
    console.error("Error trayendo la habitación por ID:", error);
  }
};

// Borrar habitación
const borrarHabitacion = async (id) => {
  try {
    const sqlQuery = `
      DELETE FROM habitaciones
      WHERE id = ?
    `;
    const [result] = await conexionMysql.query(sqlQuery, [id]);
    return result.affectedRows;
  } catch (error) {
    console.error("Error eliminando la habitación:", error);
  }
};

export default {
  crearHabitacion,
  actualizarHabitacion,
  actualizarIdHabitacion,
  apartarEstatusHabitacion,
  mostrarTodasHabitaciones,
  mostrarHabitacionID,
  borrarHabitacion,
};
