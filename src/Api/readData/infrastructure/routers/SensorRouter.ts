import { Router } from "express";
import { SensorController } from "../controllers/SensorController";

const router = Router();

router.post("/readings", SensorController.addReading); // Ruta para guardar datos
router.get("/readings", SensorController.getReadings); // Ruta para obtener datos

export default router;
