import ReportUseCase from "../../aplication/GenerateReportUseCase";
import { Request, Response } from "express";
import ReportDataRequest from "../../domain/DTOS/ReportDataRequest";
export default class ReportController {
    constructor(readonly reportUseCase: ReportUseCase) { }

    async run(req: Request, res: Response) {

        try {
        
            const {endDate, plantId, reportType, startDate}:ReportDataRequest = req.body;
            if (!endDate || !plantId || !reportType || !startDate){
                return res.status(400).json({
                    msg: 'Is required Fields',
                    data: null
                });
            }
            const typesReport = ['week', 'month', 'days']
            if (!typesReport.includes(reportType)){
                return res.status(400).json({
                    msg: "report types does not existed",
                    data: null
                })
            }

            const result = await this.reportUseCase.run({
                endDate, plantId, reportType, startDate
            })

            return res.status(200).json({
                msg: 'report generate succefully',
                data: result
            })

        } catch (error) {
            console.error(error)
            return res.status(500).json({
                msg: 'Internal Server Error',
                data: null
            })
        }
    }

}