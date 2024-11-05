import { Request, Response } from "express";
import GetByPkUseCase from "../../aplication/GetByPk";

export default class GetByPkController {
    constructor(readonly getByPkUseCase: GetByPkUseCase) { }

    async run(req: Request, res: Response) {

        try {
            const {id} = req.params;

            const result = await this.getByPkUseCase.run(id);

            return res.status(200).json({
                data: result,
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