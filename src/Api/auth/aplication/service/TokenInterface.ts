
export default interface TokenInterface {
    generateToken(name: string): string;
    validateToken(token: string): boolean;
}
