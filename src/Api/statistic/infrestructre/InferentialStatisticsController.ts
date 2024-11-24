import { Request, Response } from "express";
import { GetInferentialStatisticsUseCase } from "../aplication/InferentialStatisticsService";
import { InferentialStatisticsMongoRepository } from "./InferentialStatisticsMongoRepository";
import InferentialStatisticsModel from "./InferentialStatisticsModel";

// Instanciar el repositorio y el caso de uso
const inferentialStatisticsRepository = new InferentialStatisticsMongoRepository(InferentialStatisticsModel);
const getInferentialStatisticsUseCase = new GetInferentialStatisticsUseCase(inferentialStatisticsRepository);

export class InferentialStatisticsController {
    // Obtener todas las estadísticas inferenciales (GET)
    async getAllStatistics(req: Request, res: Response) {
        try {
            const statistics = await getInferentialStatisticsUseCase.execute();
            res.json(statistics);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener las estadísticas inferenciales." });
        }
    }

    // Obtener estadísticas inferenciales por ID de planta (GET)
    async getStatisticsByPlantId(req: Request, res: Response) {
        const { id_plant } = req.params;
        try {
            const statistics = await getInferentialStatisticsUseCase.executeByPlantId(id_plant);
            if (statistics) {
                res.json(statistics);
            } else {
                res.status(404).json({ message: "Estadísticas no encontradas para esta planta." });
            }
        } catch (error) {
            res.status(500).json({ error: "Error al obtener las estadísticas inferenciales." });
        }
    }

    // Crear estadísticas inferenciales (POST)
    async createStatistics(req: Request, res: Response) {
        const { id_plant, averageTemperature, averageHumidity, averageLight, airQuality, waterLevelStatus, mq2_value, distancia } = req.body;

        try {
            // Crear una instancia del modelo con los datos recibidos
            const newStatistics = new InferentialStatisticsModel({
                id_plant,
                averageTemperature,
                averageHumidity,
                averageLight,
                airQuality,
                waterLevelStatus,
                mq2_value,
                distancia,
            });

            // Guardar la instancia en la base de datos usando el método 'save'
            await newStatistics.save();
            res.status(201).json(newStatistics);  // Responder con las estadísticas creadas
        } catch (error) {
            res.status(500).json({ error: "Error al crear las estadísticas inferenciales." });  // En caso de error
        }
    }
}
