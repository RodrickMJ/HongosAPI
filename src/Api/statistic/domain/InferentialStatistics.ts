import { Document } from 'mongoose';

// Extender de Document para ser compatible con Mongoose
export interface InferentialStatistics extends Document {
    id_plant: string;
    averageTemperature: number;
    averageHumidity: number;
    averageLight: number;
    airQuality: string;
    waterLevelStatus: string;
    mq2_value: number;
    distancia: number;
    createdAt?: Date;
    updatedAt?: Date;
}
