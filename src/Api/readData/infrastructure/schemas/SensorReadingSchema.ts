import mongoose, { Schema, Document } from "mongoose";
import { SensorReading } from "../../domain/entities/SensorReading";

interface SensorReadingDocument extends SensorReading, Document {}

const SensorReadingSchema = new Schema({
    id_plant: { type: String, required: true },
    luz1: { type: Number, required: true },
    luz2: { type: Number, required: true },
    temp1: { type: Number, required: true },
    hum1: { type: Number, required: true },
    temp2: { type: Number, required: true },
    hum2: { type: Number, required: true },
    temp3: { type: Number, required: true },
    hum3: { type: Number, required: true },
    mq2_value: { type: Number, required: true },
    mq2_voltage: { type: Number, required: true },
    distancia: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<SensorReadingDocument>("SensorReading", SensorReadingSchema);
