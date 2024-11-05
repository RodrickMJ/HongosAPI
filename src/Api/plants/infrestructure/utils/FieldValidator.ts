import FieldValidatorInterface from "../../aplication/utils/FieldValidatorInterface";
import { Types } from "mongoose";
import PlantsRequest from "../../domain/DTOS/PlantsRequest";

export default class FieldValidator implements FieldValidatorInterface {

    addValidator(request: PlantsRequest): { isValid: boolean; message: string; } {
        if(!request){
            return {isValid: false, message: 'Is required fields'}
        }  

        return {isValid: true, message: 'ok'}
    }

    pkValidator(pk: string): { isValid: boolean; message: string; } {

        if (!Types.ObjectId.isValid(pk)){
            return {isValid: false, message: 'ID is invalid'}
        }

        return {isValid: true, message: 'ok'}

    }
}