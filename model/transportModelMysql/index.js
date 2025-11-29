//Modelo para crear transportes en mysql
import conexionMysql from "../../config/mysql.js";
import validarErrorModelo from "../../utils/validarErrorModelo.js";
//taer la conexion a la base de datos
const mysqlCliente = conexionMysql;

//crear un transporte
const crearTransporte = async (transporteData) => {
  try {
    const sqlQuery = `
        INSERT INTO transporte (tipo, nombre, modelo, capacidad, precio, asientos_disponibles, estatus)
        VALUES (?, ?, ?, ?, ?, ?,?) `;
    const [result] = await mysqlCliente.query(sqlQuery, [
      transporteData.tipo,
      transporteData.nombre,
      transporteData.modelo,
      transporteData.capacidad,
      transporteData.precio,
      transporteData.asientos_disponibles,
      transporteData.estatus,
    ]);
    return result.insertId; //Devolvemos el ID generado automaticamente
  } catch (error) {
    validarErrorModelo("No se pudo ingresar un trasporte")
  }
};

//actualizamos un transporte
const actualizarTransporte = async (transporteData) => {
  try {
    const sqlQuery = ` 
        UPDATE transporte
        SET tipo = ?, nombre = ?, modelo = ?, capacidad = ?, precio = ? asientos_disponibles = ?
        WHERE id = ? `;
    const [result] = await mysqlCliente.query(sqlQuery, [
      transporteData.tipo,
      transporteData.nombre,
      transporteData.modelo,
      transporteData.capacidad,
      transporteData.precio,
      transporteData.asientos_disponibles,
      transporteData.id,
    ]);
    console.log("Filas afectadas:", result.affectedRows);
    return result.affectedRows; // cantidad de filas afectadas
  } catch (error) {
    console.error("Error actualizando el transporte:", error);
    return 0;
  }
};

//borramos un transporte
const borrarTransporte = async (id) => {
  try {
    const sqlQuery = `
        DELETE FROM transporte
        WHERE id = ? `;
    const [result] = await mysqlCliente.query(sqlQuery, [id]);
    return result.affectedRows; // cantidad de filas afectadas
  } catch (error) {
    console.error("Error borrando el transporte:", error);
    return 0;
  }
};

//mostramos todos los transportes
const mostrarTodosTransportes = async () => {
  try {
    const sqlQuery = `
        SELECT * FROM transporte
        ORDER BY id ASC;`;
    const [rows] = await mysqlCliente.query(sqlQuery);
    return rows;
  } catch (error) {
    console.error("Error mostrando los transportes:", error);
    return [];
  }
};

const buscarTransportePorId = async (id) => {
  try {
    const sqlQuery = `
        SELECT * FROM transporte
        WHERE id = ? `;
    const [rows] = await mysqlCliente.query(sqlQuery, [id]);
    return rows[0];
  } catch (error) {
    console.error("Error buscando el transporte por ID:", error);
    return null;
  }
};

const buscarTransportePorTipo = async (tipo) => {
  try {
    const sqlQuery = `
        SELECT * FROM transporte
        WHERE tipo = ? `;
    const [rows] = await mysqlCliente.query(sqlQuery, [tipo]);
    return rows;
  } catch (error) {
    console.error("Error buscando transportes por tipo:", error);
    return [];
  }
};

export default {
  crearTransporte,
  actualizarTransporte,
  borrarTransporte,
  mostrarTodosTransportes,
  buscarTransportePorId,
  buscarTransportePorTipo,
};
