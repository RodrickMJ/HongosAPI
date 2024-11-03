import { Request, Response } from "express";
import GetByPkUseCase from "../../aplication/getByPkUseCase";

export default class GetByPkController {
    constructor(readonly getbypkUseCase: GetByPkUseCase){}

    async run (req: Request, res:Response){
        try {
            const {id} = req.params;
            const result = await this.getbypkUseCase.run(id)
            
            if (!result) {
                return res.status(404).json({
                    data: null,
                    msg: 'User not found' 
                });
            }

            return res.status(200).json({
                data: result,
                msg: 'User retrieved successfully'
            });

        } catch (error) {
            return res.status(500).json({
                data: null,
                msg: 'Internal Server'
            })
        }
    }

}