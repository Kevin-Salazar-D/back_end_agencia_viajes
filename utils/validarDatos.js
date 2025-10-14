
const validarDatos = (data, message)  => {

if (Object.values(data).some((value) => value == null)) {
        throw new Error(
         message
        );
      }


        return true;
}
export default validarDatos;