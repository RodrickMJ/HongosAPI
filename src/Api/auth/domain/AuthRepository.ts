import AuthRequest from "./DTOS/AuthRequest";
import Auth from "./Auth";
import ChangePasswordRequest from "./DTOS/ChangePasswordRequest";
export default interface AuthRepository {
    add(auth: AuthRequest): Promise <Auth | null> 
    access(auth: AuthRequest): Promise <Auth | null>
    changePassword(changePassword: ChangePasswordRequest): Promise <Boolean>
}