// Statistic.ts
import { Schema, model } from "mongoose";
import { Statistic } from "../domain/Statistic";

const StatisticSchema = new Schema<Statistic>(
    {
        id_plant: { type: String, required: true }, 
        averageTemperature: { type: Number, required: true }, 
        averageHumidity: { type: Number, required: true }, 
        averageLight: { type: Number, required: true }, 
        airQuality: { type: String, required: true }, 
        waterLevelStatus: { type: String, required: true }, 
        mq2_value: { type: Number, required: true },
        distancia: { type: Number, required: true }, 
        createdAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

export default model<Statistic>("Statistic", StatisticSchema);
