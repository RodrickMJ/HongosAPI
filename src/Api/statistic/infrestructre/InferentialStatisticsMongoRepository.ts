import { Model } from "mongoose";
import { InferentialStatistics } from "../domain/InferentialStatistics";

export class InferentialStatisticsMongoRepository {
    constructor(private model: Model<InferentialStatistics>) {}

    async save(inferentialStatistics: InferentialStatistics): Promise<void> {
        await this.model.create(inferentialStatistics);
    }

    async getAll(): Promise<InferentialStatistics[]> {
        return await this.model.find();
    }

    async getByPlantId(id_plant: string): Promise<InferentialStatistics | null> {
        return await this.model.findOne({ id_plant });
    }
}
