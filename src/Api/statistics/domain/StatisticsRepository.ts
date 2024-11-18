import PrediccionsRequest from "./DTOS/PrediccionsRequest";
import Ireadings from "./Readings";
import { dataPoint } from "./DTOS/PrediccionsResponse";
import ReportDataRequest from "./DTOS/ReportDataRequest";
import ReportDataResponse  from "./DTOS/ReportDataResponse";

export default interface StatisticsRepository {
    getPredictionsByHour(request: PrediccionsRequest): Promise<dataPoint[] | null>;
    getPredictionsByWeek(request: PrediccionsRequest): Promise<dataPoint[] | null>;
    getPredictionsByDays(request: PrediccionsRequest): Promise<dataPoint[] | null>;
    
    getWeeklyStats(request: ReportDataRequest): Promise<ReportDataResponse[] | null>;
    getMonthlyStats(request: ReportDataRequest): Promise<ReportDataResponse[] |null>;
    getDayliStats(request: ReportDataRequest): Promise<ReportDataResponse[] | null>

}