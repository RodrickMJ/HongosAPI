import AuthRepository from "../domain/AuthRepository";
import VerificationCodeInterface from "./service/VerificationCodeInterface";
import EmailInterface from "./service/Emailnterface";
import TokenInterface from "./service/TokenInterface";
import EmailRequest from "../domain/DTOS/EmailRequest";
import ResetPasswordResponse from "../domain/DTOS/ResetPasswordResponse";

export default class FindUserForPasswordResetUseCase {

    constructor(
        readonly verificationCodeService: VerificationCodeInterface,
        readonly emailService: EmailInterface,
        readonly tokenService: TokenInterface,
        readonly authRepository: AuthRepository
    ){}

    async run (name: string, email: string): Promise<ResetPasswordResponse | null> {

        const userFound = await this.authRepository.findUser(name, email);
        if (!userFound) return null
        
        const codeVerification = await this.verificationCodeService.generateVerificationCode();
        const generateToken = await this.tokenService.generateToken(userFound.name);

        const requestSenderEmail: EmailRequest = {
            to: userFound.email,
            subject: 'Código de verificación para restablecimiento de contraseña',
            text: `Su código de verificación es: ${codeVerification}`, 
        };

        await this.authRepository.storePasswordResetCode({
            code: codeVerification,
            expires: Date.now() + 60000            ,
            userId: userFound.id
        } )
        
        await this.emailService.sendEmail(requestSenderEmail);

        const response = {
            token: generateToken,
            msg: 'Código de verificación enviado correctamente.'
        }

        return response;
  
    }

}