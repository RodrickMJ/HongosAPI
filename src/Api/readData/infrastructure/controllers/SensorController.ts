import { Request, Response } from "express";
import { AddSensorReadingUseCase } from "../../application/useCases/AddSensorReadingUseCase";
import { SensorMongoRepository } from "../repositories/SensorMongoRepository";

const repository = new SensorMongoRepository();
const addSensorReadingUseCase = new AddSensorReadingUseCase(repository);

export class SensorController {
    static async addReading(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body;
            const result = await addSensorReadingUseCase.execute(data);
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }

    static async getReadings(_req: Request, res: Response): Promise<void> {
        try {
            const readings = await repository.findAll();
            res.json(readings);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
}
