import FieldValidator from "../utils/FieldValidator";
import { NextFunction, Request, Response } from "express";
import PlantsRequest from "../../domain/DTOS/PlantsRequest";

export default class VerifyFields {
    constructor(readonly fieldValidator: FieldValidator){}

     add (req:Request, res:Response, next:NextFunction){
        const {name, type}:PlantsRequest = req.body;
        const {isValid, message} = this.fieldValidator.addValidator({name, type});

        if (!isValid){
            return res.status(400).json({
                data: null,
                msg: message
            })
        }

    next();  

    }

     pk (req:Request, res:Response, next:NextFunction){
        const {id} = req.params
        const {message, isValid} =  this.fieldValidator.pkValidator(id);
        
        if (!isValid){
            return res.status(400).json({
                data: null,
                msg: message
            })
        }

        next();
    }

}