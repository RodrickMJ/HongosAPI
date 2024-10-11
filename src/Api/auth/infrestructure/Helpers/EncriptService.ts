import EncriptInterface from "../../aplication/service/EncriptInterface";
import bcrypt from "bcrypt"
import dotenv from "dotenv"

dotenv.config();

export default class EncriptService implements EncriptInterface {
    hash(password: string): string {
        return bcrypt.hashSync(
            password,
            parseInt(process.env['SALT_ROUNDS'] ?? '5'))
    }

    compare(hash_password: string, plain_password: string): boolean {
        return bcrypt.compareSync(plain_password, hash_password)
    }
}