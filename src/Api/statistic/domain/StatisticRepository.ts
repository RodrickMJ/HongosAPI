// StatisticRepository.ts
import { Statistic } from "./Statistic";

export interface StatisticRepository {
    save(statistic: Statistic): Promise<void>;
    getAll(): Promise<Statistic[]>;
    getByPlantId(id_plant: string): Promise<Statistic | null>;
}
