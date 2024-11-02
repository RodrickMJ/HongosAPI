import AuthRequest from "../domain/DTOS/AuthRequest";
import Auth from "../domain/Auth";
import AuthRepository from "../domain/AuthRepository";
import UserModel from "./Models/UserModel";
import StoragePasswordResetCodeRequest from "../domain/DTOS/StoragePasswordResetCode";

export default class UserMongoRepository implements AuthRepository {
    constructor(readonly model: typeof UserModel) {}


    async access(auth: AuthRequest): Promise<Auth | null> {
        const userFound = await this.findUser(auth.name, auth.email);
        return userFound || null;

    }

  async storePasswordResetCode(request: StoragePasswordResetCodeRequest): Promise<void> {
    try {
        await this.model.updateOne({
            id: request.userId
        },{
            passwordResetCode: request.code,
            passwordResetExpires: request.expires
        });
  
    } catch (error) {
        console.error('Error storing password reset code:', error);
        throw new Error('Could not store password reset code');
    }

  }


    async findUser(name: string, email: string): Promise<Auth | null> {
        try {

            const userFound = await this.model.findOne({ name, email });
            if (!userFound) return null;

            return {
                id: userFound.id,
                name: userFound.name,
                email: userFound.email,
                password: userFound.password,
                rol: userFound.rol
            };


        } catch (error) {
            console.error('Error trying to search for user in database:', error);
            throw new Error('Error accessing database');
        }
    }
}

