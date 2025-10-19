import conexionMysql from "../../config/mysql.js";

const mysqlCliente = conexionMysql;

// Crear hotel
const crearHotel = async (hotelData) => {
  try {
    const sqlQuery = `
      INSERT INTO hoteles (ciudad_id, nombre, direccion, estrellas, telefono)
      VALUES (?, ?, ?, ?, ?)`;
    const [result] = await mysqlCliente.query(sqlQuery, [
      hotelData.ciudad_id,
      hotelData.nombre,
      hotelData.direccion,
      hotelData.estrellas,
      hotelData.telefono,
    ]);
    return result.insertId; // ID generado automáticamente
  } catch (error) {
    console.error("Error creando el hotel:", error);
  }
};

// Actualizar datos del hotel
const actualizarHotel = async (hotelData) => {
  try {
    const sqlQuery = `
      UPDATE hoteles 
      SET nombre = ?, direccion = ?, estrellas = ?, telefono = ?, ciudad_id = ?
      WHERE id = ?`;
    const [result] = await mysqlCliente.query(sqlQuery, [
      hotelData.nombre,
      hotelData.direccion,
      hotelData.estrellas,
      hotelData.telefono,
      hotelData.ciudad_id,
      hotelData.id,
    ]);
    return result.affectedRows;
  } catch (error) {
    console.error("Error actualizando el hotel:", error);
  }
};

// Actualizar solo la ciudad del hotel
const actualizarCiudadIdHotel = async (hotelIDs) => {
  try {
    const sqlQuery = `
      UPDATE hoteles 
      SET ciudad_id = ?
      WHERE id = ?`;
    const [result] = await mysqlCliente.query(sqlQuery, [
      hotelIDs.ciudad_id,
      hotelIDs.id,
    ]);
    return result.affectedRows;
  } catch (error) {
    console.error("Error actualizando la nueva ciudad del hotel:", error);
  }
};

// Mostrar todos los hoteles
const mostrarTodosHoteles = async () => {
  try {
    const sqlQuery = `
      SELECT * FROM hoteles
      ORDER BY nombre ASC`;
    const [rows] = await mysqlCliente.query(sqlQuery);
    return rows;
  } catch (error) {
    console.error("Error mostrando todos los hoteles disponibles:", error);
  }
};

// Mostrar hoteles por ciudad
const mostrarHotelesCiudad = async (ciudad_id) => {
  try {
    const sqlQuery = `
      SELECT h.id, h.nombre, h.direccion, h.estrellas, h.telefono,
             c.nombre AS nombre_ciudad, c.pais, c.region
      FROM hoteles h
      JOIN ciudades c ON h.ciudad_id = c.id
      WHERE c.id = ?`;
    const [rows] = await mysqlCliente.query(sqlQuery, [ciudad_id]);
    return rows;
  } catch (error) {
    console.error(
      `Error mostrando los hoteles asociados a la ciudad ${ciudad_id}:`,
      error
    );
  }
};

// Borrar hotel
const borrarHotel = async (id) => {
  try {
    const sqlQuery = `
      DELETE FROM hoteles
      WHERE id = ?`;
    const [result] = await mysqlCliente.query(sqlQuery, [id]);
    return result.affectedRows;
  } catch (error) {
    console.error("Error borrando el hotel:", error);
  }
};

export default {
  crearHotel,
  actualizarHotel,
  actualizarCiudadIdHotel,
  mostrarTodosHoteles,
  mostrarHotelesCiudad,
  borrarHotel,
};
