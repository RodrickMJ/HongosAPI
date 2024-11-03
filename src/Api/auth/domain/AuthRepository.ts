import AuthRequest from "./DTOS/AuthRequest";
import Auth from "./Auth";
import StoragePasswordResetCodeRequest from "./DTOS/StoragePasswordResetCode";
export default interface AuthRepository {
    access(auth: AuthRequest): Promise<Auth | null>;
    add(auth: AuthRequest):Promise<Auth | null>
    storePasswordResetCode(request: StoragePasswordResetCodeRequest): Promise<void>;
    // verifyCodeAndResetPassword(): Promise<boolean>;
    findUser(name: string, email: string): Promise<Auth | null>;
 
}
