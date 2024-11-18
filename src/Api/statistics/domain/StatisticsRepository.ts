import PrediccionsRequest from "./DTOS/PrediccionsRequest";
import Ireadings from "./Readings";
import { dataPoint } from "./DTOS/PrediccionsResponse";
import ReportDataRequest from "./DTOS/ReportDataRequest";
import ReportDataResponse  from "./DTOS/ReportDataResponse";

export default interface StatisticsRepository {
    getPredictionsByHour(request: PrediccionsRequest): Promise<dataPoint[]>;
    getPredictionsByWeek(request: PrediccionsRequest): Promise<dataPoint[]>;
    getPredictionsByMonth(request: PrediccionsRequest): Promise<dataPoint[]>;
    
    getWeeklyStats(request: ReportDataRequest): Promise<ReportDataResponse[] | null>;
    getMonthlyStats(request: ReportDataRequest): Promise<ReportDataResponse[] | null>;
    getDayliStats(request: ReportDataRequest): Promise<ReportDataResponse[] | null>

}