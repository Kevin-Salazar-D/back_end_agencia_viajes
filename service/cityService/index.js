import validarDatos from "../../utils/validarDatos.js";
import validarFilaAfectada from "../../utils/validarFilaAfectada.js";

const cityService = (modelo) => {
    return {

        crearCiudad: async (cityData) => {
            validarDatos(cityData, "Faltan datos para la creación de ciudad");
            return await modelo.crearCiudad(cityData);
        },

        actualizarCiudad: async (cityData) => {
            validarDatos(cityData, "Faltan datos para la actualización de ciudad");
            const filasAfectadas = await modelo.actualizarCiudad(cityData);
            if (filasAfectadas === 0) throw new Error("No se encontró la ciudad a actualizar");
            return filasAfectadas;
        },

        borrarCiudad: async (id) => {
            validarDatos(id, "Falta el ID de la ciudad a eliminar");
            const filasAfectadas = await modelo.borrarCiudad(id);
            if (filasAfectadas === 0) throw new Error("No se encontró la ciudad con el ID proporcionado");
            return filasAfectadas;
        },

        borrarCiudadLogico: async (id)=>{
            validarDatos(id, "Falta el ID de la ciudad a eliminar");
            const filasAfectadas = await modelo.borradoCiudesLogico(id);
            validarFilaAfectada(filasAfectadas, "No se encontro la ciudad a borrar");
            return filasAfectadas;
        },

        mostrarTodasCiudades: async () => {
            return await modelo.mostrarTodasCiudades();
        }
    };
};

export default cityService;
