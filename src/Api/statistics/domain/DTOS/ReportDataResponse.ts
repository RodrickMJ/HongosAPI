

export default interface ReportDataResponse {
    plantId: string;
    period: string;
    averages: {
      hydrogen: number;
      oxygen: number;
      ph: number;
      temperature: number;
    };
    measurementsCount: number;
    reportType: 'week' | 'month' |'days';
  }