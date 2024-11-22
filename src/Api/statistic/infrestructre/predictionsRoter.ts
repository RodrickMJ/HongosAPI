import { Router } from "express";
import calculatePredictions from "./calculatePredictions ";
import PredictionModel from "./PredictionModel";

const routerPred = Router();

routerPred.post("/", async (req, res) => {
    try {
        const { id_plant, timeRange } = req.body; 
        if (!["hour", "day", "week"].includes(timeRange)) {
            return res.status(400).json({ error: "timeRange debe ser 'hour', 'day' o 'week'" });
        }

        const prediction = await calculatePredictions(id_plant, timeRange);
        res.status(200).json(prediction);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

routerPred.get("/predictions/:id_plant", async (req, res) => {
    try {
        const { id_plant } = req.params;
        const predictions = await PredictionModel.find({ id_plant });
        res.status(200).json(predictions);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});


export default routerPred;
