//Dependencies.ts
import Statistic from "./Statistic";
import { StatisticMongoRepository } from "./StatisticMongoRepository";
import { AddStatisticUseCase } from "../aplication/AddStatisticUseCase";
import { GetStatisticsUseCase } from "../aplication/GetStatisticsUseCase";
import { GetStatisticByPlantUseCase } from "../aplication/GetStatisticByPlantUseCase";
import { StatisticController } from "./StatisticController";


export class Dependencies {
    static getStatisticController() {
        const statisticRepository = new StatisticMongoRepository(Statistic);
        const addStatisticUseCase = new AddStatisticUseCase(statisticRepository);
        const getStatisticsUseCase = new GetStatisticsUseCase(statisticRepository);
        const getStatisticByPlantUseCase = new GetStatisticByPlantUseCase(statisticRepository);

        return new StatisticController(addStatisticUseCase, getStatisticsUseCase, getStatisticByPlantUseCase);
    }
}
