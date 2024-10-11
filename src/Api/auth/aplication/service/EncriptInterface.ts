
export default interface EncriptInterface {
    hash(password: string): string;
    compare (hash_password: string, plain_password: string): boolean;

} 