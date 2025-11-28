const generarNumeroReservacion = (longitud) =>{
     const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
     let codigo = "RES-";

     for(let i =0; i<longitud; i++ ){
        const indice = Math.floor(Math.random() * caracteres.length);
        codigo+= caracteres[indice];
     }
    return codigo;
}

export default generarNumeroReservacion;