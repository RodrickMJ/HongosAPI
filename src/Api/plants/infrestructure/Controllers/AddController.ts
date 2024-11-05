import AddUseCase from "../../aplication/AddUseCase";
import { Request, Response } from "express";
import PlantsRequest from "../../domain/DTOS/PlantsRequest";

export default class AddController {
    constructor(readonly addUseCase: AddUseCase){}

    async run (req:Request, res:Response){
        try {
            const {name, type}:PlantsRequest = req.body;
            const result = await this.addUseCase.run({ name, type});

            return res.status(201).json({
                data: result,
                msg: 'create new plants succefully'
            })

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                data: null,
                msg: 'Internal Server Error'
            })
        }
    }

}