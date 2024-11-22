import { Schema, model } from 'mongoose';

const inferentialStatsSchema = new Schema({
    id_plant: { type: String, required: true },
    tTestResult: { type: Number, required: true },
    confidenceInterval: {
        lowerBound: { type: Number, required: true },
        upperBound: { type: Number, required: true },
    },
    timestamp: { type: Date, default: Date.now },
});

const InferentialStatisticsModel = model('InferentialStatistics', inferentialStatsSchema);

export { InferentialStatisticsModel };
