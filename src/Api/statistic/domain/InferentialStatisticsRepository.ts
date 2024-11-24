// `InferentialStatisticsRepository.ts` en la carpeta `domain`
import { InferentialStatistics } from "./InferentialStatistics";

export interface InferentialStatisticsRepository {
    save(inferentialStatistics: InferentialStatistics): Promise<void>;
    getAll(): Promise<InferentialStatistics[]>;
    getByPlantId(id_plant: string): Promise<InferentialStatistics | null>;
}
