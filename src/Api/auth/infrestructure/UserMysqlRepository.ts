import AuthRequest from "../domain/DTOS/AuthRequest";
import Auth from "../domain/Auth";
import AuthRepository from "../domain/AuthRepository";
import UserModel from "./Models/UserModel";
import UUIDInterface from "../aplication/service/UUIDInterface";
import UpdatePasswordRequest from "../domain/DTOS/UpdatePasswordRequest";

export default class MysqlRepository implements AuthRepository {
    constructor(
        readonly model: typeof UserModel,
        readonly generateUuid: UUIDInterface
    ) {
        this.model.sync({alter: true});
    }

    async access(auth: AuthRequest): Promise<Auth | null> {
        try {
            const user = await this.model.findOne({
                where: { email: auth.email, name: auth.name }
            });

            if (user === null) return null;

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                rol: user.rol
            }

        } catch (error) {
            console.log('Internal Server Error')
            console.log(error);
            return null
        }
    }

    async changePassword(updatePassword: UpdatePasswordRequest): Promise<String> {

        try {

            const update = await this.model.update({ password: updatePassword.newPassword }, {
                where: {
                    email: updatePassword.email,
                    password: updatePassword.newPassword
                }
            })

            if (!update) {
                return 'User not found'
            } else {
                console.log({ update })

                return 'Change password is succesfully'
            }

        } catch (error) {
            console.log(error)
            console.log('Internal Server Error');
            return 'Internal Server Error'
        }

    }


}

