import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateChatResponse = async (userMessage, chatHistory = [], contextoBD = {}) => {
  
  // Convertimos los datos a texto
  const infoHoteles = JSON.stringify(contextoBD.hoteles || []);
  const infoPaquetes = JSON.stringify(contextoBD.paquetes || []);

  const systemInstruction = `
    Eres un agente de viajes experto y amigable de la agencia "ViajesFácil". 
    Tu objetivo es vender y recomendar nuestros servicios basándote ÚNICAMENTE en la siguiente información de nuestra base de datos en tiempo real:
    
    HOTELES DISPONIBLES: ${infoHoteles}
    PAQUETES DISPONIBLES: ${infoPaquetes}

    REGLAS:
    1. Solo recomienda destinos, hoteles y paquetes que aparezcan en la lista anterior.
    2. Si preguntan por algo que no tenemos, di amablemente que por ahora no está disponible y ofrece nuestras opciones actuales.
    3. Menciona detalles atractivos como los precios, las amenidades, las reglas o el tipo de transporte si la información lo incluye.
    4. Habla de forma natural y conversacional. NUNCA menciones que estás leyendo un "JSON", un "ID", o una "base de datos". Actúa como si lo supieras de memoria.
  `;

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    systemInstruction: systemInstruction,
  });

  const chat = model.startChat({
    history: chatHistory,
  });

  const result = await chat.sendMessage(userMessage);
  const response = await result.response;
  
  return response.text();
};