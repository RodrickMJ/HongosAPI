
export default interface ReportDataRequest {
    startDate: Date;
    endDate: Date;
    plantId: string;
    reportType: 'week' | 'month' | 'days';
}