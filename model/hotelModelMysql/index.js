import conexionMysql from "../../config/mysql.js";
import validarErrorModelo from "../../utils/validarErrorModelo.js";

const mysqlCliente = conexionMysql;

// Crear hotel
const crearHotel = async (hotelData) => {
  try {
    const sqlQuery = `
      INSERT INTO hoteles 
        (ciudad_id, nombre, direccion, imagen, estrellas, telefono)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await mysqlCliente.query(sqlQuery, [
      hotelData.ciudad_id,
      hotelData.nombre,
      hotelData.direccion,
      hotelData.imagen,
      hotelData.estrellas,
      hotelData.telefono,
    ]);

    return result.insertId;
  } catch (error) {
     validarErrorModelo(error, "Ciudad no encontrada ");
     throw error;
  }
};

// Actualizar datos del hotel
const actualizarHotel = async (hotelData) => {
  try {
    const sqlQuery = `
      UPDATE hoteles
      SET nombre = ?, direccion = ?, imagen = ?, estrellas = ?, telefono = ?, ciudad_id = ?
      WHERE id = ?
    `;

    const [result] = await mysqlCliente.query(sqlQuery, [
      hotelData.nombre,
      hotelData.direccion,
      hotelData.imagen,
      hotelData.estrellas,
      hotelData.telefono,
      hotelData.ciudad_id,
      hotelData.id,
    ]);

    if (result.affectedRows === 0) {
      const e = new Error("No se encontró el hotel con ese ID");
      e.status = 404;
      throw e;
    }

    return result;
  } catch (error) {
    validarErrorModelo(error, "La ciudad indicada no existe");
    throw error;
  }
};


// Actualizar solo la ciudad del hotel
const actualizarCiudadIdHotel = async (hotelIDs) => {
  try {
    const sqlQuery = `
      UPDATE hoteles 
      SET ciudad_id = ?
      WHERE id = ?
    `;

    const [result] = await mysqlCliente.query(sqlQuery, [
      hotelIDs.ciudad_id,
      hotelIDs.id,
    ]);

    return result.affectedRows;
  } catch (error) {
    validarErrorModelo(error, "Error actualizando ciudad del hotel:");
    throw error;
  }
};

// Mostrar todos los hoteles
const mostrarTodosHoteles = async () => {
  try {
    const sqlQuery = `
      SELECT * FROM hoteles
      ORDER BY id ASC
    `;

    const [rows] = await mysqlCliente.query(sqlQuery);
    return rows;
  } catch (error) {
    console.error("Error mostrando hoteles:", error);
    throw error;
  }
};

// Mostrar hoteles por ciudad
const mostrarHotelesCiudad = async (ciudad_id) => {
  try {
    const sqlQuery = `
      SELECT 
        h.id, h.nombre, h.direccion, h.imagen, h.estrellas, h.telefono,
        c.nombre AS nombre_ciudad, c.pais, c.region
      FROM hoteles h
      JOIN ciudades c ON h.ciudad_id = c.id
      WHERE c.id = ?
    `;

    const [rows] = await mysqlCliente.query(sqlQuery, [ciudad_id]);
    return rows;
  } catch (error) {
    validarErrorModelo(error, "Error mostrando los  hoteles" );
    throw error;
  }
};

// Obtener un hotel
const obtenerHotel = async (id) => {
  try {
    const sqlQuery = `
      SELECT * FROM hoteles
      WHERE id = ?
    `;

    const [rows] = await mysqlCliente.query(sqlQuery, [id]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

// Borrar hotel
const borrarHotel = async (id) => {
  try {
    const sqlQuery = `
      DELETE FROM hoteles
      WHERE id = ?
    `;

    const [result] = await mysqlCliente.query(sqlQuery, [id]);
    return result.affectedRows;
  } catch (error) {
    validarErrorModelo(error, "No se pudo borrar el hotel ya que tiene habitaciones asociadas")};
  }
;

export default {
  crearHotel,
  actualizarHotel,
  actualizarCiudadIdHotel,
  mostrarTodosHoteles,
  mostrarHotelesCiudad,
  obtenerHotel,
  borrarHotel,
};
