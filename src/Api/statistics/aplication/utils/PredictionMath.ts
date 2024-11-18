import { dataPoint } from "../../domain/DTOS/PrediccionsResponse"

export default interface PredictionMathInterface {
    calculateTrend(data: dataPoint[]) : { slope: number, intercept: number }
    generatePredictions(
        historicalData: dataPoint[],
        trend: { slope: number; intercept: number },
        type: 'week' | 'month' | 'hours' | 'days'): dataPoint[]
}
