import PlantsModel from "./models/PlantsModel";
import PlantsRepository from "../domain/PlantsRepository";
import PlantsRequest from "../domain/DTOS/PlantsRequest";
import IPlants from "../domain/Plants";

export default class PlantsMongoRepository implements PlantsRepository {

    constructor(readonly model: typeof PlantsModel) { }

    async add(Plant: PlantsRequest): Promise<IPlants | null> {
        try {

            const isRegister = await this.isExistedPlant(Plant.name, Plant.type)
            if (isRegister) return null;

            const result = await this.model.create(Plant);

            const response: IPlants = {
                id: result.id,
                name: result.name,
                registration_date: result.registration_date,
                type: result.type
            }

            return response

        } catch (error) {
            console.log(error);
            throw new Error('Error adding new plant. Please try again.');
        }
    }

    async list(): Promise<IPlants[] | null> {
        try {
            const result = await this.model.find();
            if (!result) return null
            const plants: Array<IPlants> = []

            result.map((plant) => {
                plants.push({
                    id: plant.id,
                    name: plant.name,
                    type: plant.type,
                    registration_date: plant.registration_date,
                })
            })

            return plants

        } catch (error) {
            console.error(error);
            throw new Error('Error retrieving the list of plants.');
        }
    }


    async getByPk(pk: string): Promise<IPlants | null> {
        try {
            const result = await this.model.findById(pk);
            if (!result) return null

            const response: IPlants = {
                id: result.id,
                name: result.name,
                type: result.type,
                registration_date: result.registration_date
            }

            return response;

        } catch (error) {
            console.error(error);
            throw new Error(`Error retrieving plant with id: ${pk}.`);
        }
    }

    async delete(pk: string): Promise<boolean> {
        try {
            const deletedPlants = await this.model.findOneAndDelete({
                _id: pk
            });

            return deletedPlants !== null;

        } catch (error) {
            console.error(error);
            throw new Error(`Error deleting plant with id: ${pk}.`);
        }
    }


    async isExistedPlant(name: string, type: string): Promise<IPlants | null> {
        try {
            const result = await this.model.findOne({ name, type });
            if (!result) return null;

            const response: IPlants = {
                id: result.id,
                name: result.name,
                registration_date: result.registration_date,
                type: result.type
            };

            return response;

        } catch (error) {
            console.error(error);
            throw new Error(`Error checking if plant exists with name: ${name} and type: ${type}.`);
        }
    }


}