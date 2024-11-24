import { Request, Response } from "express";
import TrendModel from "./TrendModel";
import { calculateTrends } from "../aplication/TrendsService";
import SensorsDataRequest from "../domain/SensorDataRequest";

// Base de datos para datos anteriores simulados (solo en memoria)
let previousData: SensorsDataRequest | null = null;

// Endpoint para calcular tendencias
export const calculateAndStoreTrends = async (req: Request, res: Response) => {
    try {
        const currentData: SensorsDataRequest = req.body;

        if (!currentData.id_plant) {
            return res.status(400).json({ error: "id_plant es requerido" });
        }

        // Calcular tendencias
        const trends = calculateTrends(currentData, previousData);

        // Almacenar tendencias en la base de datos
        const storedTrends = await TrendModel.insertMany(
            trends.map(trend => ({
                id_plant: currentData.id_plant,
                ...trend,
            }))
        );

        // Actualizar datos previos
        previousData = currentData;

        res.status(200).json({
            message: "Tendencias calculadas y almacenadas exitosamente",
            trends: storedTrends,
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
