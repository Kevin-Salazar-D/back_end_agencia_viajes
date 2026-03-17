import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de agencia de viajes",
      version: "3.7.1",
      description: "Gestiona usuarios, ciudades y hoteles",
    },
    servers: [
      {
        url: 'https://back-end-agencia-viajes.onrender.com/agenciaViajes',
        description: "Servidor en produccion"
      },
      { 
        url: "http://localhost:3000/agenciaViajes",
        description: "URL local"
      }
    ],

    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token", 
        },
      },
    },
  },

  apis: [
    "./swagger/swagger-endpoint-usuarios.js",
    "./swagger/swagger-endpoint-ciudades.js",
    "./swagger/swagger-endpoint-hoteles.js",
    "./swagger/swagger-endpoint-habitaciones.js",
    "./swagger/swagger-endpoint-transporte.js",
    "./swagger/swagger-endpoint-detallesHotel.js",
    "./swagger/swagger-endpoint-imagenes-hoteles.js",
    "./swagger/swagger-endpoint-viajes.js",
    "./swagger/swagger-endpoint-paquetes.js",
    "./swagger/swagger-endpoint-reservaciones.js",
    "./swagger/swagger-endpoint-pagos.js",
    "./swagger/swager-endpoint-autorizacion.js",
  ],
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  console.log("Documentación disponible en http://localhost:3000/api-docs");
};

export default setupSwagger;