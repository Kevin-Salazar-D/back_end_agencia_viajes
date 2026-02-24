import speakeasy from "speakeasy";

const generarCodigoAutorizacion = (usuario) => {

    const secret = speakeasy.generateSecret({
        length: 20,
        name: `ViaF:${usuario.correo}-${usuario.id}`,
        issuer: "ViaF"
    });

    return secret;
};

export default generarCodigoAutorizacion;