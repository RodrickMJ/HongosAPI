import AuthRepository from "../domain/AuthRepository";
import TokenInterface from "./service/TokenInterface";
import VerificationCodeInterface from "./service/VerificationCodeInterface";

export default class ResetPasswordUseCase {
    constructor(
        readonly verificationCodeService: VerificationCodeInterface,
        readonly tokenService: TokenInterface,
        readonly authRepository: AuthRepository
    ){}

    async run (){
        
    }

}