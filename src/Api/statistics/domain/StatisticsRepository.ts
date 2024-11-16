import PrediccionsRequest from "./DTOS/PrediccionsRequest";
import Ireadings from "./Readings";
import { dataPoint } from "./DTOS/PrediccionsResponse";

export default interface StatisticsRepository {
    getPredictionsByHour(request: PrediccionsRequest): Promise<dataPoint[]>;
    getPredictionsByWeek(request: PrediccionsRequest): Promise<dataPoint[]>;
    getPredictionsByMonth(request: PrediccionsRequest): Promise<dataPoint[]>;
}