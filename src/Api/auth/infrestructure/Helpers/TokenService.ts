import jwt from "jsonwebtoken"
import TokenInterface from "../../aplication/service/TokenInterface"
import dotenv from "dotenv"

dotenv.config();

export default class TokenService implements TokenInterface {

    generateToken(name: string): string {
        return jwt.sign({
           name
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