import PredictionMathInterface from "../../aplication/utils/PredictionMath";
import { dataPoint } from "../../domain/DTOS/PrediccionsResponse";

export default class PredictionMath implements PredictionMathInterface {
    constructor() { }

    //calcular tendencia
    calculateTrend(data: dataPoint[]): { slope: number; intercept: number; } {

        const n = data.length;
        const xValues = Array.from({ length: n }, (_, i) => i);
        const yValues = data.map(d => d.value);

        const sumX = xValues.reduce((a, b) => a + b, 0);
        const sumY = yValues.reduce((a, b) => a + b, 0);
        const sumXY = xValues.reduce((sum, x, i) => sum + x * yValues[i], 0);
        const sumXX = xValues.reduce((sum, x) => sum + x * x, 0);

        const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;
        //retorna lo que es la pendiente y la interseccion 
        return { slope, intercept };
    }

    generatePredictions(
        historicalData: dataPoint[],
        trend: { slope: number; intercept: number; },
        type: "week" | "month" | "hours") : dataPoint[] {

        const predictions: dataPoint[] = [];
        const lastDataPoint = historicalData[historicalData.length - 1];
        const futurePoints = 4; // Número de predicciones a generar

        for (let i = 1; i <= futurePoints; i++) {
            const predictedValue = trend.slope * (historicalData.length + i) + trend.intercept;
            let nextTime: string;

            switch (type) {
                case 'hours':
                    const [date, hour] = lastDataPoint.time.split(' ');
                    const currentHour = parseInt(hour);
                    nextTime = `${date} ${(currentHour + i).toString().padStart(2, '0')}:00`;
                    break;
                case 'week':
                    const [year, week] = lastDataPoint.time.split('-W');
                    const nextWeek = parseInt(week) + i;
                    nextTime = `${year}-W${nextWeek.toString().padStart(2, '0')}`;
                    break;
                case 'month':
                    const [yearMonth] = lastDataPoint.time.split('-');
                    const month = parseInt(lastDataPoint.time.split('-')[1]) + i;
                    const nextYear = parseInt(yearMonth) + Math.floor((month - 1) / 12);
                    const nextMonth = ((month - 1) % 12 + 1).toString().padStart(2, '0');
                    nextTime = `${nextYear}-${nextMonth}`;
                    break;
            }

            predictions.push({
                time: nextTime,
                value: Number(predictedValue.toFixed(1))
            });
        }

        return predictions;

    }

}