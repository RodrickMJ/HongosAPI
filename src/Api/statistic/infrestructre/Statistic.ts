// Statistic.ts (Mongoose Schema)
import { Schema, model } from "mongoose";
import { Statistic } from "../domain/Statistic";

const StatisticSchema = new Schema<Statistic>(
    {
        id_plant: { type: String, required: true },
        averageTemperature: { type: Number, required: true },
        maxTemperature: { type: Number, required: true },
        minTemperature: { type: Number, required: true },
        stdDevTemperature: { type: Number, required: false },
        averageHumidity: { type: Number, required: true },
        maxHumidity: { type: Number, required: true },
        minHumidity: { type: Number, required: true },
        stdDevHumidity: { type: Number, required: true },
        averageLight: { type: Number, required: true },
        maxLight: { type: Number, required: true },
        minLight: { type: Number, required: true },
        stdDevLight: { type: Number, required: true },
        airQuality: { type: String, required: true },
        waterLevelStatus: { type: String, required: true },
        mq2_value: { type: Number, required: true },
        distancia: { type: Number, required: true },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export default model<Statistic>("Statistic", StatisticSchema);

