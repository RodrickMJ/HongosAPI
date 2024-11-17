import 'dotenv/config'
import {IncomingMessage} from "http"
import jwt from "jsonwebtoken"


type AuthCallback = (err: string | null, succes: boolean) => void;

 const authMiddleware = (req: IncomingMessage, callback: AuthCallback) => {

    try {
        const token = req.headers['authorization'];
        const SECRET = process.env["JWT_SECRET"] ?? "DEFAULT_SECRET";
        
        if (!token) return callback('No token Provided', false)
        
        jwt.verify(token.replace('Bearer', ' '), SECRET)
        return callback('Token valid', true)

    } catch (error) {
        console.log('Token Invalid')
        callback('Token Invalid', false)
    }

}


export default authMiddleware;