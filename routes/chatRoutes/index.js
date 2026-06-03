import { Router } from "express";
import { handleChatRequest } from "../../controllers/chatController/index.js";

const chatRutasFactory = (hotelServicio, paquetesServicio) => {
    const router = Router();
    
    router.post('/', (req, res) => handleChatRequest(req, res, hotelServicio, paquetesServicio));
    
    return router;
};

export default chatRutasFactory;