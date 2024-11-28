// AddStatisticUseCase.ts
import { StatisticRepository } from "../domain/StatisticRepository";
import { Statistic } from "../domain/Statistic";

export class AddStatisticUseCase {
    constructor(private statisticRepository: StatisticRepository) {}

    async execute(statistic: Statistic): Promise<void> {
        await this.statisticRepository.save(statistic);
    }
}
