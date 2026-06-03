import { generateChatResponse } from '../../service/chatService/index.js';

export const handleChatRequest = async (req, res, hotelServicio, paquetesServicio) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'El mensaje del usuario es requerido.' });
    }

    let hotelesDb = [];
    let paquetesDb = [];
    
    try {
      hotelesDb = await hotelServicio.mostrarTodosHoteles(); 
      paquetesDb = await paquetesServicio.mostrarTodosPaquetes(); 
    } catch (dbError) {
      console.error('Error al consultar BD para el chat:', dbError);
    }

    
    const contextoBD = {
      hoteles: hotelesDb,
      paquetes: paquetesDb
    };


    const reply = await generateChatResponse(message, history || [], contextoBD);
    
    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Error en chatController:', error);
    return res.status(500).json({ 
      error: 'Hubo un error interno en el servidor.' 
    });
  }
};