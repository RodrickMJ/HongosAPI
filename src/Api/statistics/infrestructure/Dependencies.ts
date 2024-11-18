import GetPredictionsControllers from "./controllers/GetPredictionsController";
import GetPredictionsUseCase from "../aplication/GetPredictionsUseCase";
import ReadingsMongoRepository from "./ReadingsMongoRepository";
import TokenService from "./service/TokenService";
import AuthMiddleware from "./middleware/Auth";
import { ReadinsModel } from "./models/ReadingsModel";
import PredictionMath from "./utils/PredictionMath";
import ReportUseCase from "../aplication/GenerateReportUseCase";
import ReportController from "./controllers/ReportController";

const readingsMongoRepository = new ReadingsMongoRepository(ReadinsModel);

const predictionsMath = new PredictionMath();
const tokenService = new TokenService()

const reportUseCase = new ReportUseCase(readingsMongoRepository);
const getPredictionsUseCase = new GetPredictionsUseCase(readingsMongoRepository, predictionsMath);

export const reportControler = new ReportController(reportUseCase);
export const authMiddleware = new AuthMiddleware(tokenService)
export const getPredictionsController = new GetPredictionsControllers(getPredictionsUseCase);
