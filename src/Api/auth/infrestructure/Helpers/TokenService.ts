import { TryStatement } from './../../../node_modules/acorn/dist/acorn.d';
import jwt from "jsonwebtoken"
import TokenInterface from "../../aplication/service/TokenInterface"
import AuthRequest from "../../domain/DTOS/AuthRequest"
import dotenv from "dotenv"

dotenv.config();

export default class TokenService implements TokenInterface {
    constructor ( readonly auth: AuthRequest){}

    generateToken(auth: AuthRequest): string {
        return jwt.sign({
            name: auth.name
        },
         process.env['JWT_SECRET'] ?? "DEFAULT_SECRET", 
        {
          algorithm: 'HS256',
          expiresIn: 60*60
        }
    );
    }

    validateToken(token: string): boolean {
       try {
            const rest = jwt.verify(
                token,
                process.env["JWT_SECRET"] ?? "DEFAULT_SECRET",
                {algorithms: ['HS256']}
            )

            console.log(rest)
            return true

       } catch (error) {
            console.log(error)
            return false
       }
    }

}