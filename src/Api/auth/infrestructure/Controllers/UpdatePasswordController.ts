import { Request, Response } from "express";
import UpdatePasswordRequest from "../../domain/DTOS/UpdatePasswordRequest";
import UpdatePasswordUseCase from "../../aplication/UpdatePasswordUseCase";

export default class UpdatePasswordController {
    constructor (readonly updatePasswordUseCase: UpdatePasswordUseCase){}

    async run (req: Request, res:Response){
        try {
            const {email, name, newPassword}:UpdatePasswordRequest = req.body;
            
        } catch (error) {
            
        }
    }
}