import mongoose, { Schema } from "mongoose";
import Ireadings from "../interfaces/database/Readings";

const readingsSchema = new Schema<Ireadings>({
    id_plant: {
        type: Schema.Types.ObjectId,
        ref: 'Plants',
        required: true
    },

    luz1: {
        type: Number,
        required: true
    },

    luz2: {
        type: Number,
        required: true
    },

    temp1: {
        type: Number,
        required: true
    },

    hum1: {
        type: Number,
        required: true
    },

    temp2: {
        type: Number,
        required: true
    },

    hum2: {
        type: Number,
        required: true
    },

    temp3: {
        type: Number,
        required: true
    },

    hum3: {
        type: Number,
        required: true
    },

    mq2_value: {
        type: Number,
        required: true
    },

    mq2_voltage: {
        type: Number,
        required: true
    },

    distancia: {
        type: Number,
        required: true
    },

    register_date: {
        type: Date,
        default: Date.now
    }
});

export const ReadingsModel = mongoose.model('Readings', readingsSchema);
