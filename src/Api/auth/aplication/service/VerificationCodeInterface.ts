
export default interface VerificationCodeInterface {
    generateVerificationCode(): string;
    validateVerificationCode(code: string): boolean;
}
