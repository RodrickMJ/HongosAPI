import PlantsRepository from "../domain/PlantsRepository";
import IPlants from "../domain/Plants";

export default class GetByPkUseCase {
    constructor(readonly plantsRepository: PlantsRepository){}

    async run (pk: string): Promise<IPlants | null>{
        return await this.plantsRepository.getByPk(pk);

    }

}