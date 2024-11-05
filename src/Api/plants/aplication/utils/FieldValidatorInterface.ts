import PlantsRequest from "../../domain/DTOS/PlantsRequest"

export default interface FieldValidatorInterface {
    addValidator(request: PlantsRequest): {isValid: boolean, message: string}
    pkValidator(pk: string): {isValid: boolean, message: string}
}