import { ObjectId } from "mongoose"

export default interface Ireadings {
    id_plant: ObjectId,
    temperature: number,
    ph: number,
    hydrogen: number,
    oxigen: number,
    register_date: Date
}