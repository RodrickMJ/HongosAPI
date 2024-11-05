import { Request, Response } from "express";
import DeleteUseCase from "../../aplication/deleteUseCase";

export default class DeleteController {
    constructor(readonly deleteUseCase: DeleteUseCase) { }

    async run(req:Request, res:Response) {
        try {

            const {id} = req.params;
            const result = await this.deleteUseCase.run(id);
            
            if (!result){
                return res.status(409).json({
                    data: null,
                    msg: "Plant has been permanently removed."
                })
            }

            return res.status(204).send();

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                data: null,
                msg: 'Internal Server Error'
            })
        }
    }

}