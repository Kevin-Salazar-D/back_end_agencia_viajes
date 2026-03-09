const validarCorreo = (correo, mensaje) => {
   
    const correoLimpio = correo ? correo.trim() : "";

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if(!correoLimpio || !regex.test(correoLimpio)){
        const error = new Error(mensaje);
        error.status = 400;
        throw error;
    }
    
    return correoLimpio;
}

export default validarCorreo;