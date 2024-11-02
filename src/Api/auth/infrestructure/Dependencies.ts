import AccessUseCase from "../aplication/AccessUseCase";
import UserMongoRepository from "./UserMongoRepository";
import AccessController from "./Controllers/AccessControllers";
import TokenService from "./Helpers/TokenService";
import EncriptService from "./Helpers/EncriptService";
import UserModel from "./Models/UserModel";
import FindUserForPasswordResetController from "./Controllers/FindUserForPasswordResetControllers";
import FindUserForPasswordResetUseCase from "../aplication/FindUserForPasswordResetUseCase";
import EmailService from "./Helpers/EmailService";
import VerificationCodeService from "./Helpers/VerificationCodeService";

const userMongoRepository = new UserMongoRepository(UserModel);
const encryptService = new EncriptService()
const tokenService = new TokenService()
const emailService = new EmailService();
const verifyCodeService = new VerificationCodeService();

const accessUseCase = new AccessUseCase(
    tokenService,
    encryptService,
    userMongoRepository
);

const findUserForPasswordResetUseCase = new FindUserForPasswordResetUseCase(
    verifyCodeService,
    emailService,
    tokenService,
    userMongoRepository
);


export const accessController = new AccessController(accessUseCase);
export const findUserForPasswordResetController = new FindUserForPasswordResetController(
    findUserForPasswordResetUseCase
);