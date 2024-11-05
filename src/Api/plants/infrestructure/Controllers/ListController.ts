import { Request, Response } from "express";
import ListUseCase from "../../aplication/ListUseCase";

export default class ListController {
    constructor(readonly listUseCase: ListUseCase){}

    async run (_req: Request, res:Response){
        try {
            
            const user = await this.listUseCase.run();

            return res.status(200).json({
                data: user,
                msg: 'Plants retrieved successfully'
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                data: null,
                msg: 'Internal Server Error'
            })
        }
    }

}