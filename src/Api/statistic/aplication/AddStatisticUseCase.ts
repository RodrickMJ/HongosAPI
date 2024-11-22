// AddStatisticUseCase.ts
import { Statistic } from "../domain/Statistic";
import { StatisticRepository } from "../domain/StatisticRepository";

export class AddStatisticUseCase {
    constructor(private statisticRepository: StatisticRepository) {}

    async execute(statistic: Statistic): Promise<void> {
        await this.statisticRepository.save(statistic);
    }
}
