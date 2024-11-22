import { Schema, model } from 'mongoose';

const trendSchema = new Schema({
    id_plant: { type: String, required: true },
    temperatureTrend: { type: Number, required: true },
    humidityTrend: { type: Number, required: true },
    lightTrend: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
});

const TrendModel = model('Trend', trendSchema);

export { TrendModel };
