
export default interface PrediccionsRequest {
    startDate: string,
    endDate: string,
    idPlant: string
    typeSensor: string
    typePredictions: 'week' | 'month' | 'hours';
}