const generarCodigosUnicos = (codigo,longitud) =>{
     const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
     let codigoPrefijo = codigo;

     for(let i =0; i<longitud; i++ ){
        const indice = Math.floor(Math.random() * caracteres.length);
        codigoPrefijo+= caracteres[indice];
     }
    return codigoPrefijo;
}

export default generarCodigosUnicos;