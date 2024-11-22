import { ObjectId } from "mongoose";

export default interface Ireadings {
    id_plant: ObjectId;

    luz1: number;
    luz2: number;

    temp1: number;
    hum1: number;

    temp2: number;
    hum2: number;

    temp3: number;
    hum3: number;

    mq2_value: number;
    mq2_voltage: number;

    distancia: number;

    register_date: Date;
}
