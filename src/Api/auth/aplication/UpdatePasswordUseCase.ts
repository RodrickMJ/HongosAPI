import AuthRepository from "../domain/AuthRepository";
import UpdatePasswordRequest from "../domain/DTOS/UpdatePasswordRequest";
import EncriptInterface from "./service/EncriptInterface";


export default class UpdatePasswordUseCase {
    constructor(
        readonly authRepository: AuthRepository,
        readonly encryptService: EncriptInterface
        ){}

    async run (updataPassword: UpdatePasswordRequest): Promise<string>{
        try {
            updataPassword.newPassword = this.encryptService.hash(updataPassword.newPassword);
            const result = await this.authRepository.changePassword(updataPassword)
            if (!result) return 'There was an error trying to change the password'

            return 'The password has been successfully updated'

        } catch (error) {
            console.log(error)
            console.log('Internal Server Error')
            return 'Internal Server Error'
        }
    }

}