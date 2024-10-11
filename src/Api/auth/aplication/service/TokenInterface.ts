import AuthRequest from "../../domain/DTOS/AuthRequest";

export default interface TokenInterface {
    generateToken(auth: AuthRequest): string;
    validateToken(token: string): boolean;
}
