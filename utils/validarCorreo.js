const valdarCorreo = (correo, mensaje)=>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!correo || !regex.test(correo)){
        const error = new Error(mensaje);
        error.status = 400;
        throw error;
    }
    return correo;
}

export default valdarCorreo;