import AuthRequest from "../domain/DTOS/AuthRequest";
import Auth from "../domain/Auth";
import AuthRepository from "../domain/AuthRepository";
import UserModel from "./Models/UserModel";
import UUIDInterface from "../aplication/service/UUIDInterface";
import ChangePasswordRequest from "../domain/DTOS/ChangePasswordRequest";

export default class MysqlRepository implements AuthRepository{
    constructor(
        readonly model: typeof UserModel,
        readonly generateUuid: UUIDInterface
    ){
        this.model.sync();
    }

  async access(auth: AuthRequest): Promise<Auth | null> {
        try {
            const user = await this.model.findOne({
                where: {email: auth.email, name: auth.name}
            });

            if(user === null) return null;

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password
            }

        } catch (error) {
            console.log('Internal Server Error')
            console.log(error);
            return null
        }
    }

  async add(auth: AuthRequest): Promise<Auth | null> {
       try {
        const email_registered = await this.isExistedEmail(auth.email);

        if (email_registered === null){
            const newUser = await this.model.create({
                name: auth.name,
                email: auth.email,
                password: auth.password,
                id: this.generateUuid.get_uuid()
            })

            return newUser

        } else {
            return null
        }

       } catch (error) {
        console.log('Internal Server Error')
        console.log(error);
        return null
       } 
    }

   async changePassword(changePassword: ChangePasswordRequest): Promise<Boolean> {
        try {
            const isExistedUser = await this.model.findOne({
                where: {
                    email: changePassword.email,
                    name: changePassword.name
                }
            })

           return isExistedUser ?  true : false    
        
        } catch (error) {
            console.log('Internal Server')
            return false
        }
    }

    private async isExistedEmail(email: string): Promise<Auth | null>{
        try {
            
            const result = await this.model.findOne({
                where: {email: email}
            });

            if (result === null) return null;

            const response: Auth = {
                id: result.id,
                name: result.name,
                email: result.email,
                password: result.password
            }

            return response;

        } catch (error) {
            console.log('Error en la consulta');
            console.error(error);
            return null;
        }
    }

}

