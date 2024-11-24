import { Schema, model } from "mongoose";

interface Trend {
    id_plant: string;
    metric: string;
    trend: "increasing" | "decreasing" | "stable";
    rateOfChange: number;
    createdAt?: Date;
}

const TrendSchema = new Schema<Trend>(
    {
        id_plant: { type: String, required: true },
        metric: { type: String, required: true },
        trend: { type: String, required: true, enum: ["increasing", "decreasing", "stable"] },
        rateOfChange: { type: Number, required: true },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export default model<Trend>("Trend", TrendSchema);
