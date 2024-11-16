import GetPredictionsControllers from "./controllers/GetPredictionsController";
import GetPredictionsUseCase from "../aplication/GetPredictionsUseCase";
import ReadingsMongoRepository from "./ReadingsMongoRepository";
import TokenService from "./service/TokenService";
import AuthMiddleware from "./middleware/Auth";
import { ReadinsModel } from "./models/ReadingsModel";
import PredictionMath from "./utils/PredictionMath";


const readingsMongoRepository = new ReadingsMongoRepository(ReadinsModel);

const predictionsMath = new PredictionMath();
const tokenService = new TokenService()


const getPredictionsUseCase = new GetPredictionsUseCase(readingsMongoRepository, predictionsMath);

export const authMiddleware = new AuthMiddleware(tokenService)
export const getPredictionsController = new GetPredictionsControllers(getPredictionsUseCase);
