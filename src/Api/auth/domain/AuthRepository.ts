import AuthRequest from "./DTOS/AuthRequest";
import Auth from "./Auth";

export default interface AuthRepository {
    add(auth: AuthRequest): Promise <Auth | null> 
    access(auth: AuthRequest): Promise <Auth | null>
}