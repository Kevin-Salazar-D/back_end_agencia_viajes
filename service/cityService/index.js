import validarDatos from "../../utils/validarDatos.js";
const cityService = (modelo) => {
    return {
        crearCiudad: async (cityData) => {
            validarDatos(cityData, "Faltan datos para la creacion de ciudad");
            return modelo.crearCiudad(cityData);
        },
        actualizarCiudad: async (cityData) => {
            validarDatos(cityData, "Faltan datos para la actualizacion de ciudad");
            return modelo.actualizarCiudad(cityData);
        },
        borrarCiudad: async (id) => {
            validarDatos(id, "Falta el ID de la ciudad a eliminar");
            const filaAfectada = modelo.borrarCiudad(id);
            if (filaAfectada === 0) throw new Error("No se encontró la ciudad con el ID proporcionado");
            return filaAfectada;
        },
        mostrarTodasCiudades: async () => {
            return modelo.mostrarTodasCiudades();
        }
    }



};

export default cityService;
