//StatisticMongoRepository.ts
import { Model } from "mongoose";
import { Statistic } from "../domain/Statistic";
import { StatisticRepository } from "../domain/StatisticRepository";

export class StatisticMongoRepository implements StatisticRepository {
    constructor(private statisticModel: Model<Statistic>) {}

    async save(statistic: Statistic): Promise<void> {
        await this.statisticModel.create(statistic);
    }

    async getAll(): Promise<Statistic[]> {
        return await this.statisticModel.find();
    }

    async getByPlantId(id_plant: string): Promise<Statistic | null> {
        return await this.statisticModel.findOne({ id_plant });
    }
}
