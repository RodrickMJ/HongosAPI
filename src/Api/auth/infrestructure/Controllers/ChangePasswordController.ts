import { Request, Response } from "express";
import ChangePasswordRequest from "../../domain/DTOS/ChangePasswordRequest";
import ChangePasswordUseCase from "../../aplication/PatchPasswordUseCase";

export default class ChangePasswordController {
    constructor(readonly changePasswordUseCase: ChangePasswordUseCase) { }

    async run(req: Request, res: Response) {

        try {
            const { email, newPassword, name }: ChangePasswordRequest = req.body;

            if (!email || !newPassword || !name) {
                return res.status(400).json({
                    msg: "is required complete fields"
                });
            }

            const result = await this.changePasswordUseCase.run({
                email,
                newPassword,
                name
            })

            if (!result){
                return res.status(409).json({
                    data: null,
                    msg: "Hubo un error al intentar cambiar la contraseña"
                })
            }

            return result

        } catch (error) {
            console.log("Internal Server Error");
            console.error(error);
            return res.status(500).json({
                data: null,
                msg: 'Internal Server Error',
            });
        }
    }

}