import AccessUseCase from "../aplication/AccessUseCase";
import AddUseCase from "../aplication/AddUseCase";
import ChangePasswordUseCase from "../aplication/PatchPasswordUseCase";
import MysqlUserRepository from "./UserMysqlRepository";
import AccessController from "./Controllers/AccessControllers";
import AddController from "./Controllers/AddControllers";
import ChangePasswordController from "./Controllers/ChangePasswordController";
import EncriptService from "./Helpers/EncriptService";
import TokensService from "./Helpers/TokenService";
import UUIDService from "./Helpers/UUIDService";
import UserModel from "./Models/UserModel";

export const encryptService = new EncriptService();
export const uuidService = new UUIDService();
export const tokenService = new TokensService();

export const mysqlUserRepository = new MysqlUserRepository(UserModel, uuidService);

export const addUseCase = new AddUseCase(
    tokenService,
    encryptService,
    mysqlUserRepository
)

export const accessUseCase = new AccessUseCase(
    tokenService,
    encryptService,
    mysqlUserRepository
);

export const patchPassword = new  ChangePasswordUseCase(
    tokenService,
    encryptService,
    mysqlUserRepository
)


export const addController = new AddController(addUseCase);
export const accessController = new AccessController(accessUseCase);
export const patchController = new ChangePasswordController(patchPassword)



