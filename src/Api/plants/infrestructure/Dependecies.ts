import AddUseCase from "../aplication/AddUseCase";
import ListUseCase from "../aplication/ListUseCase";
import GetByPkUseCase from "../aplication/GetByPk";
import DeleteUseCase from "../aplication/deleteUseCase";
import AddController from "./Controllers/AddController";
import ListController from "./Controllers/ListController";
import GetByPkController from "./Controllers/GetPkController";
import DeleteController from "./Controllers/DeleteController";
import PlantsModel from "./models/PlantsModel";
import PlantsMongoRepository from "./PlantsMongoRepository";
import FieldValidator from "./utils/FieldValidator";
import VerifyFields from "./middlewares/verifyFields";
import TokenService from "./service/TokenService";
import AuthMiddleware from "./middlewares/Auth";


const plantMongoRepository = new  PlantsMongoRepository(PlantsModel);
const fieldValidator = new FieldValidator();
const tokenService = new TokenService();

const addUseCase = new AddUseCase(plantMongoRepository);
const listUseCase = new ListUseCase(plantMongoRepository);
const getByPkUseCase = new GetByPkUseCase(plantMongoRepository);
const deleteUseCase = new DeleteUseCase(plantMongoRepository)

//middlewares
export const fieldValidatorMiddleware = new VerifyFields(fieldValidator);
export const authMiddleware = new AuthMiddleware(tokenService);

//controllers 
export const addController = new AddController(addUseCase);
export const listController = new ListController(listUseCase);
export const getByPkController = new GetByPkController(getByPkUseCase);
export const deleteController = new DeleteController(deleteUseCase);