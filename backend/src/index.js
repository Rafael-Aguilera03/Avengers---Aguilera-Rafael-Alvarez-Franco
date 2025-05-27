import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

// Importar rutas
import memberRoutes from "./routes/members.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Ruta raíz
app.get("/", (req, res) => {
  res.send("¡Bienvenido a S.H.I.E.L.D. Tech!");
});

// Rutas del sistema
app.use("/members", memberRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🟢 Servidor corriendo en: http://localhost:${PORT}`);
});