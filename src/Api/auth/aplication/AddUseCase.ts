import AuthRepository from "../domain/AuthRepository";
import AuthRequest from "../domain/DTOS/AuthRequest";
import AuthResponse from "../domain/DTOS/AuthResponse";
import TokenInterface from "./service/TokenInterface";
import EncriptInterface from "./service/EncriptInterface";

export default class AddUseCase {
    constructor(
        readonly tokenService: TokenInterface,
        readonly encriptService: EncriptInterface,
        readonly authRepository: AuthRepository
    ) { }

    async run(auth: AuthRequest): Promise<AuthResponse | null> {
        try {
            auth.password = this.encriptService.hash(auth.password);
            const result = await this.authRepository.add(auth);

            if (!result) return null;

            const response: AuthResponse = {
                id: result.id,
                email: result.email,
                name: result.name,
                token: this.tokenService.generateToken(auth)
            }

            return response

        } catch (error) {
            console.log('Hubo un error en el servidor');
            return null
        }


    }

}