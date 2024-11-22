import { SensorReading } from "../entities/SensorReading";

export interface SensorRepository {
    save(data: SensorReading): Promise<SensorReading>;
    findAll(): Promise<SensorReading[]>;
}
