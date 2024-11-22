import { SensorReading } from "../../domain/entities/SensorReading";
import { SensorRepository } from "../../domain/repositories/SensorRepository";

export class AddSensorReadingUseCase {
    private repository: SensorRepository;

    constructor(repository: SensorRepository) {
        this.repository = repository;
    }

    async execute(data: SensorReading): Promise<SensorReading> {
        // Valida o procesa datos antes de guardar
        if (!data.id_plant) {
            throw new Error("El campo 'id_plant' es obligatorio");
        }

        // Guarda los datos en el repositorio
        return await this.repository.save(data);
    }
}
