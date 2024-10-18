import AuthRepository from "../domain/AuthRepository";
import ChangePasswordRequest from "../domain/DTOS/ChangePasswordRequest";
import TokenInterface from "./service/TokenInterface";
import EncriptInterface from "./service/EncriptInterface";

export default class ChangePasswordUseCase {
    constructor (
        readonly tokenService: TokenInterface,
        readonly encryptService: EncriptInterface,
        readonly authRepository: AuthRepository
    ){}

    async run (changePassword: ChangePasswordRequest): Promise<Boolean>{
        try {
            const result = await this.authRepository.changePassword(changePassword);
            return result 

        } catch (error) {
            console.log('Internal Server Error');
            return false
        }
    }

}