import PlantsRequest from "./DTOS/PlantsRequest";
import IPlants from "./Plants";

export default interface PlantsRepository {
    add (Plant: PlantsRequest) : Promise<IPlants | null>
    getByPk(pk: string) : Promise<IPlants | null>
    list() : Promise<IPlants[] | null>
    delete(pk:string) : Promise<boolean>
}