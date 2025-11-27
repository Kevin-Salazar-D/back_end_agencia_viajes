import conexionMysql from "../../config/mysql.js";
import validarErrorModelo from "../../utils/validarErrorModelo.js";

const mysqlCliente = conexionMysql;


// Crear paquete
const crearPaquete = async (paqueteData) => {
  try {
    const sqlQuery = `
      INSERT INTO paquetes 
      (transporte_id, ciudad_id, tipo_paquete, descripcion, precio, fecha_inicio, fecha_fin, tiempo_estadia, hotel_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const [result] = await mysqlCliente.query(sqlQuery, [
      paqueteData.transporte_id,
      paqueteData.ciudad_id,
      paqueteData.tipo_paquete,
      paqueteData.descripcion,
      paqueteData.precio,
      paqueteData.fecha_inicio,
      paqueteData.fecha_fin,
      paqueteData.tiempo_estadia,
      paqueteData.hotel_id
    ]);

    return result.insertId;
  } catch (error) {
    validarErrorModelo(error, "Error al crear el paquete. Transporte, Ciudad o Hotel no encontrados.");
    throw error;
  }
};


// Actualizar paquete
const actualizarPaquete = async (paqueteData) => {
  try {
    const sqlQuery = `
      UPDATE paquetes
      SET transporte_id = ?, ciudad_id = ?, 
          tipo_paquete = ?, descripcion = ?, precio = ?, 
          fecha_inicio = ?, fecha_fin = ?, tiempo_estadia = ?, hotel_id = ?
      WHERE id = ?
    `;

    const [result] = await mysqlCliente.query(sqlQuery, [
      paqueteData.transporte_id,
      paqueteData.ciudad_id,
      paqueteData.tipo_paquete,
      paqueteData.descripcion,
      paqueteData.precio,
      paqueteData.fecha_inicio,
      paqueteData.fecha_fin,
      paqueteData.tiempo_estadia,
      paqueteData.hotel_id,
      paqueteData.id
    ]);

    return result.affectedRows; // 1 si se actualizó, 0 si no existe
  } catch (error) {
    validarErrorModelo(error, "Error al actualizar el paquete. Datos incorrectos.");
    throw error;
  }
};


// Mostrar paquetes por hotel
const mostrarPaquetesPorHotel = async (hotel_id) => {
  try {
    const sqlQuery = `
      SELECT 
        p.id AS paquete_id,
        p.tipo_paquete,
        p.descripcion AS paquete_descripcion,
        p.precio,
        p.fecha_inicio,
        p.fecha_fin,
        p.tiempo_estadia,
        t.nombre AS transporte,
        c.nombre AS ciudad,
        h.id AS hotel_id,
        h.nombre AS hotel_nombre,
        h.direccion AS hotel_direccion,
        h.estrellas AS hotel_estrellas,
        h.telefono AS hotel_telefono,
        h.imagen AS hotel_imagen
      FROM paquetes p
      LEFT JOIN hoteles h ON p.hotel_id = h.id
      LEFT JOIN ciudades c ON p.ciudad_id = c.id
      LEFT JOIN transporte t ON p.transporte_id = t.id
      WHERE p.hotel_id = ?
      ORDER BY p.id;
    `;

    const [rows] = await mysqlCliente.query(sqlQuery, [hotel_id]);
    return rows;
  } catch (error) {
    console.error("Error mostrando paquetes por hotel:", error);
    throw error;
  }
};

// Mostrar todos los paquetes
const mostrarTodosPaquetes = async () => {
  try {
    const sqlQuery = `
      SELECT 
        p.id AS paquete_id,
        p.tipo_paquete,
        p.descripcion AS paquete_descripcion,
        p.precio,
        p.fecha_inicio,
        p.fecha_fin,
        p.tiempo_estadia,
        t.nombre AS transporte,
        c.nombre AS ciudad,
        h.id AS hotel_id,
        h.nombre AS hotel_nombre,
        h.direccion AS hotel_direccion,
        h.estrellas AS hotel_estrellas,
        h.telefono AS hotel_telefono,
        h.imagen AS hotel_imagen
      FROM paquetes p
      LEFT JOIN hoteles h ON p.hotel_id = h.id
      LEFT JOIN ciudades c ON p.ciudad_id = c.id
      LEFT JOIN transporte t ON p.transporte_id = t.id
      ORDER BY p.id;
    `;

    const [rows] = await mysqlCliente.query(sqlQuery);
    return rows;
  } catch (error) {
    console.error("Error mostrando todos los paquetes:", error);
    throw error;
  }
};


// Mostrar paquete por ID

const mostrarPaqueteID = async (id) => {
  try {
    const sqlQuery = `SELECT * FROM paquetes WHERE id = ?`;
    const [rows] = await mysqlCliente.query(sqlQuery, [id]);
    return rows[0] || null; // devuelve un solo paquete o null si no existe
  } catch (error) {
    console.error("Error mostrando paquete por ID:", error);
    throw error;
  }
};


// Borrar paquete
const borrarPaquete = async (id) => {
  try {
    const sqlQuery = `
      DELETE FROM paquetes
      WHERE id = ?
    `;

    const [result] = await mysqlCliente.query(sqlQuery, [id]);
    return result.affectedRows; // 1 si se borró, 0 si no existía
  } catch (error) {
    console.error("Error borrando el paquete:", error);
    throw error;
  }
};

// Exportar funciones

export default {
  crearPaquete,
  actualizarPaquete,
  mostrarPaquetesPorHotel,
  mostrarTodosPaquetes,
  mostrarPaqueteID,
  borrarPaquete
};
