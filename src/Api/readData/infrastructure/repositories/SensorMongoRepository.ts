import { SensorReading } from "../../domain/entities/SensorReading";
import { SensorRepository } from "../../domain/repositories/SensorRepository";
import SensorReadingModel from "../schemas/SensorReadingSchema";

export class SensorMongoRepository implements SensorRepository {
    async save(data: SensorReading): Promise<SensorReading> {
        const sensorReading = new SensorReadingModel(data);
        return await sensorReading.save();
    }

    async findAll(): Promise<SensorReading[]> {
        return await SensorReadingModel.find().sort({ timestamp: -1 });
    }
}
