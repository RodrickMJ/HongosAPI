import PlantsRepository from "../domain/PlantsRepository";
import IPlants from "../domain/Plants";

export default class ListUseCase {
    constructor(readonly plantsRepository: PlantsRepository){}

    async run () : Promise <IPlants[] | null>{
        const result = await this.plantsRepository.list();
        if (!result) return null
        return result

    }

}