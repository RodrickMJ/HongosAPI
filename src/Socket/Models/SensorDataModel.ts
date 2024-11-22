import mongoose, { Schema, Document } from 'mongoose';

export interface SensorData extends Document {
    id_plant: string;
    luz1: number;
    luz2: number;
    temp1: number;
    hum1: number;
    temp2: number;
    hum2: number;
    temp3: number;
    hum3: number;
    mq2_value: number;
    mq2_voltage: number;
    distancia: number;
    timestamp: Date;
}

const SensorDataSchema: Schema = new Schema({
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

const SensorDataModel = mongoose.model<SensorData>('SensorData', SensorDataSchema);

export default SensorDataModel;
