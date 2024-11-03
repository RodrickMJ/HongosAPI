import { Request, Response, NextFunction } from "express";
import DecodeToken from "../services/TokenService";

export default class AuthMiddleware {
    constructor(readonly tokenService: DecodeToken){}

    async run (req: Request, res:Response, next: NextFunction){
        
        const token = req.headers['authorization'];

        if(!token){
            return res.status(401).json({
                msg: "No token provided",
                data: null
            })
        }

    const isValid = this.tokenService.validateToken(token.replace('Bearer', ""));
    if (!isValid){
        return res.status(401).json({
            msg: "Invalid token",
            data: null
        })
    }
   
    next();
    }

}