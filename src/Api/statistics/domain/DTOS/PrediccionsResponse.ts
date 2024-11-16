
export interface PredictionsResponse {
    sensortype: string,
    startDate: string,
    endDate: string,
    historicalData: dataPoint[],
    predictions: dataPoint[]
}


export interface dataPoint {
    time: string,
    value: number
}