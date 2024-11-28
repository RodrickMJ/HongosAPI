import { Request, Response } from "express";
import TrendModel from "./TrendModel";
import { calculateBatchTrends } from "../aplication/TrendsService";
import SensorsDataRequest from "../domain/SensorDataRequest";

// Cola para almacenar los datos recibidos
const queue: SensorsDataRequest[] = [];
const PROCESS_INTERVAL = 5 * 60 * 1000; // 5 minutos en milisegundos

// Procesar la cola periódicamente
setInterval(async () => {
    if (queue.length > 0) {
        const batchData = [...queue]; // Copiar datos
        queue.length = 0; // Vaciar la cola

        // Calcular tendencias y almacenarlas en la base de datos
        const trends = calculateBatchTrends(batchData);
        const storedTrends = await TrendModel.insertMany(
            trends.map(trend => ({
                id_plant: batchData[0].id_plant,
                ...trend,
                createdAt: new Date(),
            }))
        );

        console.log("Tendencias procesadas y almacenadas:", storedTrends);
    }
}, PROCESS_INTERVAL);

// Endpoint para recibir datos
export const calculateAndStoreTrends = async (req: Request, res: Response) => {
    try {
        const currentData: SensorsDataRequest = req.body;

        if (!currentData.id_plant) {
            return res.status(400).json({ error: "id_plant es requerido" });
        }

        // Agregar datos a la cola
        queue.push(currentData);

        res.status(200).json({
            message: "Datos recibidos y en cola para procesamiento.",
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

// Endpoint para obtener tendencias
export const getTrends = async (req: Request, res: Response) => {
    try {
        const { id_plant } = req.params;

        if (!id_plant) {
            return res.status(400).json({ error: "id_plant es requerido" });
        }

        // Consultar tendencias de la base de datos
        const trends = await TrendModel.find({ id_plant }).sort({ createdAt: -1 });

        res.status(200).json(trends);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
