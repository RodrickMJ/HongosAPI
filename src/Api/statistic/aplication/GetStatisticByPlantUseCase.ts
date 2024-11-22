// GetStatisticByPlantUseCase.ts
import { Statistic } from "../domain/Statistic";
import { StatisticRepository } from "../domain/StatisticRepository";

export class GetStatisticByPlantUseCase {
    constructor(private statisticRepository: StatisticRepository) {}

    async execute(id_plant: string): Promise<Statistic | null> {
        return await this.statisticRepository.getByPlantId(id_plant);
    }
}
