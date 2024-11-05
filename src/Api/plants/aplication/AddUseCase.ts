import PlantsRequest from "../domain/DTOS/PlantsRequest";
import PlantsRepository from "../domain/PlantsRepository";
import IPlants from "../domain/Plants";

export default class AddUseCase {
    constructor(readonly plantsRepository: PlantsRepository){}

    async run (plantsRequest: PlantsRequest): Promise <IPlants | null>{
        return await this.plantsRepository.add(plantsRequest)

    }

}