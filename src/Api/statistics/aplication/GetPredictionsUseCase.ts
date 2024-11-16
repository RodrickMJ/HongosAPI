import StatisticsRepository from "../domain/StatisticsRepository";
import PrediccionsRequest from "../domain/DTOS/PrediccionsRequest";
import {PredictionsResponse, dataPoint} from "../domain/DTOS/PrediccionsResponse";
import PredictionMathInterface from "./utils/PredictionMath";

export default class GetPredictionsUseCase {
    constructor(
        readonly statisticsRepository: StatisticsRepository,
        readonly predictionMath: PredictionMathInterface){}

    async run (request: PrediccionsRequest):Promise<PredictionsResponse>{

        let historicalData: dataPoint[];

        switch (request.typePredictions){
            case 'week': 
                    historicalData = await this.statisticsRepository.getPredictionsByWeek(request);
                break;
            
            case 'hours': 
                historicalData = await this.statisticsRepository.getPredictionsByHour(request);
                break;

            case 'month':
                historicalData = await this.statisticsRepository.getPredictionsByMonth(request);
                break;
            
            default :
            throw new Error('Tipo de predicción no soportado');

        }

    
        const trend =  this.predictionMath.calculateTrend(historicalData);
        const predictions = this.predictionMath.generatePredictions(
                historicalData,
                trend,
                request.typePredictions);

        return {
            sensortype: request.typeSensor,
            startDate: request.startDate,
            endDate: request.endDate,
            historicalData,
            predictions
        };
        
    }
}
