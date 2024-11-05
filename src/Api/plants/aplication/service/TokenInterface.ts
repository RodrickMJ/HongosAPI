
export default interface TokenService {
    validateToken(token: string): boolean;
}