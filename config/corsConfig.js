import cors from "cors";

const corsInfo = {

  origin: "",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  //autorizar por falta de token
  allowedHeaders: ["Content-Type", "Authorization" ]
}

export default cors(corsInfo);