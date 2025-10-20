import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions ={
    definition:{
        openapi: "3.0.0",
        info:{
            title: "API de agencia de viajes",
            version: "1.0.0",
            description: "Gestiona usuarios, ciudades y hoteles",
        },
        servers: [{url:"http://localhost:3000/agenciaViajes",}]
    },
    apis: [
        "./swagger/swagger-endpoint-usuarios.js",
        "./swagger/swagger-endpoint-ciudades.js",
        "./swagger/swagger-endpoint-hoteles.js",
        "./swagger/swagger-endpoint-habitaciones.js"
    ],
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  console.log("Documentación disponible en http://localhost:3000/api-docs");
};

export default setupSwagger;