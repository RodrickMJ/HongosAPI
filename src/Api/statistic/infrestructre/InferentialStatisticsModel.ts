import { Schema, model, Document } from 'mongoose';
import { InferentialStatistics } from '../domain/InferentialStatistics';

// Definir el esquema de Mongoose para InferentialStatistics
const InferentialStatisticsSchema = new Schema<InferentialStatistics>(
    {
        id_plant: { type: String, required: true },
        averageTemperature: { type: Number, required: true },
        averageHumidity: { type: Number, required: true },
        averageLight: { type: Number, required: true },
        airQuality: { type: String, required: true },
        waterLevelStatus: { type: String, required: true },
        mq2_value: { type: Number, required: true },
        distancia: { type: Number, required: true },
    },
    { timestamps: true } 
);

export default model<InferentialStatistics>("InferentialStatistics", InferentialStatisticsSchema);
