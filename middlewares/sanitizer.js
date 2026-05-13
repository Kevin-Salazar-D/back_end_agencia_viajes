import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";

// Configuramos JSDOM para simular un navegador en Node.js
const window = new JSDOM("").window;
const dompurify = createDOMPurify(window);

const sanitizer = (req, res, next) => {
  const selecPet = ["body", "query", "params"];

  selecPet.forEach((seccion) => {
    // Si la sección existe en la petición enviada por el cliente
    if (req[seccion]) {
      for (const key in req[seccion]) {
        if (typeof req[seccion][key] === "string") {
          const cleanText = dompurify.sanitize(req[seccion][key], { ALLOWED_TAGS: [] });
          req[seccion][key] = cleanText.trim();
        }
      }
    }
  });

  next();
};

export default sanitizer;
