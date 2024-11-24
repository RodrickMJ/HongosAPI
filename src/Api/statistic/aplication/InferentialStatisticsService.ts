// useCases/GetInferentialStatisticsUseCase.ts
import { InferentialStatistics } from "../domain/InferentialStatistics";
import { InferentialStatisticsRepository } from "../domain/InferentialStatisticsRepository";

export class GetInferentialStatisticsUseCase {
    constructor(private inferentialStatisticsRepository: InferentialStatisticsRepository) {}

    // Obtener todas las estadísticas inferenciales
    async execute(): Promise<InferentialStatistics[]> {
        return await this.inferentialStatisticsRepository.getAll();
    }

    // Obtener estadísticas inferenciales por ID de planta
    async executeByPlantId(id_plant: string): Promise<InferentialStatistics | null> {
        return await this.inferentialStatisticsRepository.getByPlantId(id_plant);
    }
}
