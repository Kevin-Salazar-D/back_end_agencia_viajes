import CryptoJS from "crypto-js";

// 1. TU FUNCIÓN ENCRIPTADORA (Pura lógica matemática)
const encriptarPayload = (data) => {
    const apiKey = process.env.SECRET_KEY_AES;

    if(!apiKey) return null;

    try {
        const dataString = JSON.stringify(data);
        const encriptado = CryptoJS.AES.encrypt(dataString, apiKey).toString();
        return encriptado;
    } catch (error) {
        console.error("ERROR NO SE PUDO ENCRIPTAR:", error); 
        return null; 
    }
};

// 2. TU MIDDLEWARE INTERCEPTOR (El Guardia de Seguridad)
const encriptacionDatos = (req, res, next) => { 
    // Guardamos la herramienta original de Express
    const jsonOriginal = res.json;

    // Sobrescribimos (ponemos la trampa)
    res.json = function (datosDelControlador) {
        
        // TRUCO: Si es un error (404, 500), NO lo encriptamos para poder leerlo
        if (res.statusCode >= 400) {
            return jsonOriginal.call(this, datosDelControlador);
        }

        // Pasamos los datos por tu función encriptadora
        const datosProtegidos = encriptarPayload(datosDelControlador);

        // Si falló la encriptación, mandamos los datos normales para no dejar la pantalla en blanco
        if (!datosProtegidos) {
            return jsonOriginal.call(this, datosDelControlador);
        }

        // Si todo salió bien, usamos la herramienta original pero mandamos el texto encriptado
        return jsonOriginal.call(this, { data: datosProtegidos });
    };

    // Dejamos pasar la petición hacia el controlador
    next(); // ¡Punto y coma!
};

export default encriptacionDatos;