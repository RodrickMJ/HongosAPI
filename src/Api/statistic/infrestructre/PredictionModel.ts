import { Schema, model } from "mongoose";
import { Prediction } from "../domain/Prediction";

const PredictionSchema = new Schema<Prediction>(
    {
        id_plant: { type: String, required: true },
        timeRange: { type: String, required: true, enum: ["hour", "day", "week"] },
        averageTemperature: { type: Number, required: true },
        averageHumidity: { type: Number, required: true },
        averageLight: { type: Number, required: true },
        airQuality: { type: String, required: true },
        waterLevelStatus: { type: String, required: true },
        mq2_value: { type: Number, required: true },
        distancia: { type: Number, required: true },
        temperatureProbability: { type: Number, required: false }, // Nuevo campo
        humidityProbability: { type: Number, required: false },   // Nuevo campo
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export default model<Prediction>("Prediction", PredictionSchema);
