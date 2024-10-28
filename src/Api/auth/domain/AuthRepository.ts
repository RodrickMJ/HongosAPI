import AuthRequest from "./DTOS/AuthRequest";
import Auth from "./Auth";
import UpdatePasswordRequest from "./DTOS/UpdatePasswordRequest";
export default interface AuthRepository {
    access(auth: AuthRequest): Promise <Auth | null>
    changePassword(updatePassword: UpdatePasswordRequest): Promise <String>
}