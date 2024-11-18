import StatisticsRepository from "../domain/StatisticsRepository";
import ReportDataRequest from "../domain/DTOS/ReportDataRequest";
import ReportDataResponse from "../domain/DTOS/ReportDataResponse";

export default class ReportUseCase {
    constructor(readonly statisticsRepository: StatisticsRepository) { }

    async run(request: ReportDataRequest): Promise<ReportDataResponse[] | null> {
        let result: ReportDataResponse[] | null = null;

        switch (request.reportType){
            case 'week':  result = await this.statisticsRepository.getWeeklyStats(request);
                break;
            
            case 'month':  result = await this.statisticsRepository.getMonthlyStats(request);
            break;

            case 'days': result = await this.statisticsRepository.getDayliStats(request);
            break;

            default:
                throw new Error(`Invalid report type: ${request.reportType}`);
            
        }

        return result;
    }
}