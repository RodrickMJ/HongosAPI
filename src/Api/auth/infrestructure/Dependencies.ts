import AccessUseCase from "../aplication/AccessUseCase";
import MysqlUserRepository from "./UserMysqlRepository";
import AccessController from "./Controllers/AccessControllers";
import EncriptService from "./Helpers/EncriptService";
import TokensService from "./Helpers/TokenService";
import UUIDService from "./Helpers/UUIDService";
import UserModel from "./Models/UserModel";
import UpdatePasswordUseCase from "../aplication/UpdatePasswordUseCase";
import UpdatePasswordController from "./Controllers/UpdatePasswordController";
export const encryptService = new EncriptService();
export const uuidService = new UUIDService();
export const tokenService = new TokensService();

export const mysqlUserRepository = new MysqlUserRepository(UserModel, uuidService);


export const accessUseCase = new AccessUseCase(
    tokenService,
    encryptService,
    mysqlUserRepository
);

export const updatePasswordUseCase = new UpdatePasswordUseCase(mysqlUserRepository, encryptService)



export const accessController = new AccessController(accessUseCase)
export const updatePasswordController = new UpdatePasswordController(updatePasswordUseCase);


