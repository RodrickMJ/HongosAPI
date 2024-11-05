import PlantsRepository from "../domain/PlantsRepository";

export default class DeleteUseCase {
    constructor(readonly plantsRepository: PlantsRepository){}

    async run (pk: string): Promise<boolean>{
        return this.plantsRepository.delete(pk)
    }

}