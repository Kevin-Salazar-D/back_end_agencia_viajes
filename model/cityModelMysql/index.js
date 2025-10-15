//modelo para la creacion de ciudades en mysql
import conexionMysql from "../../config/mysql.js";

//traer la conexion a la base de datos
const mysqlCliente = conexionMysql;

//crear una ciudad
const crearCiudad = async (cityData)=>{
 try {
    const sqlQuery = `
      INSERT INTO ciudades (nombre, pais, region, codigo_postal)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await mysqlCliente.query(sqlQuery, [
        cityData.nombre,
        cityData.pais,
        cityData.region,
        cityData.codigo_postal
    ])
    return result.insertId; //Devolvemos el ID generado automaticamente
 } catch (error) {
    console.error("Error creando la ciudad:", error);
    
 }
}
//actualizamos una ciudad
const actualizarCiudad = async (cityData) => {
  try {

    const sqlQuery = `
      UPDATE ciudades
      SET nombre = ?, pais = ?, region = ?, codigo_postal = ?
      WHERE id = ?
    `;

    const [result] = await mysqlCliente.query(sqlQuery, [
      cityData.nombre,
      cityData.pais,
      cityData.region,
      cityData.codigo_postal,
      cityData.id
    ]);

    console.log("Filas afectadas:", result.affectedRows);
    return result.affectedRows; // cantidad de filas afectadas

  } catch (error) {
    console.error("Error actualizando la ciudad:", error);
    return 0;
  }
};

//borramos una ciudad
const borrarCiudad = async (id)=>{
 try {
    const sqlQuery = `
      DELETE FROM ciudades
      WHERE id = ?
    `;
    const [result] = await mysqlCliente.query(sqlQuery, [id])
    return result.affectedRows; //Devolvemos la cantidad de filas afectadas
 } catch (error) {
    console.error("Error borrando la ciudad:", error);
    
 }
}

//mostramos todas las ciudades disponibles
const mostrarTodasCiudades = async ()=>{
try {
    const sqlQuery = `
    SELECT * FROM ciudades
    ORDER BY nombre ASC
    `;
    const [rows] = await mysqlCliente.query(sqlQuery);
    return rows; //Devolvemos todas las filas obtenidas por la consulta
 } catch (error) {
    console.error("Error obteniendo las ciudades:", error); 
 } 

}
 
    
export default { crearCiudad, actualizarCiudad, borrarCiudad, mostrarTodasCiudades };

