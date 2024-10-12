import { Request, Response } from "express";
import AuthRequest from "../../domain/DTOS/AuthRequest";
import AddUseCase from "../../aplication/AddUseCase";

export default class AddController {
    constructor (readonly AdduseCase:AddUseCase ){}

    async run (req: Request, res:Response){
       
        try {
            const {name, email, password} = req.body;

            if (!name || !email || !password){
                return res.status(400).json({
                    msg: "is required complete fields"
                })
            }


            const request: AuthRequest = {
                name,
                email,
                password
            }
            const authSaved = await this.AdduseCase.run(request);
          
            if (!authSaved){
               
                return res.status(409).json({
                    data: null,
                    msg: "Email already registered"
                })
            }

            return res.status(201).json({
                data: authSaved,
               msg: "User registered succesfully"
            })

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