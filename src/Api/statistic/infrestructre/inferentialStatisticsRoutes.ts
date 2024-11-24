import express from 'express';
import { InferentialStatisticsController } from './InferentialStatisticsController';

const router = express.Router();
const inferentialStatisticsController = new InferentialStatisticsController();

// Ruta POST para crear estadísticas inferenciales
router.post("/", inferentialStatisticsController.createStatistics);  // Crear estadísticas

// Ruta GET para obtener todas las estadísticas inferenciales
router.get("/", inferentialStatisticsController.getAllStatistics);  // Obtener todas las estadísticas

// Ruta GET para obtener estadísticas inferenciales por ID de planta
router.get("/:id_plant", inferentialStatisticsController.getStatisticsByPlantId);  // Obtener por ID de planta

export default router;
