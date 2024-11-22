//  GetStatisticsUseCase.ts
import { Statistic } from "../domain/Statistic";
import { StatisticRepository } from "../domain/StatisticRepository";

export class GetStatisticsUseCase {
    constructor(private statisticRepository: StatisticRepository) {}

    async execute(): Promise<Statistic[]> {
        return await this.statisticRepository.getAll();
    }
}
