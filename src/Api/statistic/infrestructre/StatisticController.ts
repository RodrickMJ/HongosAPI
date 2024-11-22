// StatisticController
import { Request, Response } from "express";
import { AddStatisticUseCase } from "../aplication/AddStatisticUseCase";
import { GetStatisticsUseCase } from "../aplication/GetStatisticsUseCase";
import { GetStatisticByPlantUseCase } from "../aplication/GetStatisticByPlantUseCase";

export class StatisticController {
    constructor(
        private addStatisticUseCase: AddStatisticUseCase,
        private getStatisticsUseCase: GetStatisticsUseCase,
        private getStatisticByPlantUseCase: GetStatisticByPlantUseCase
    ) {}

    async addStatistic(req: Request, res: Response): Promise<void> {
        try {
            await this.addStatisticUseCase.execute(req.body);
            res.status(201).json({ message: "Statistic added successfully" });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    async getStatistics(_: Request, res: Response): Promise<void> {
        try {
            const statistics = await this.getStatisticsUseCase.execute();
            res.status(200).json(statistics);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    async getStatisticByPlant(req: Request, res: Response): Promise<void> {
        try {
            const statistic = await this.getStatisticByPlantUseCase.execute(req.params.id_plant);
            if (statistic) {
                res.status(200).json(statistic);
            } else {
                res.status(404).json({ message: "Statistic not found" });
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}
