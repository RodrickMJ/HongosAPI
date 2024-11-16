import { Router } from "express";
import {authMiddleware, getPredictionsController} from "../Dependencies"
const router =  Router();

router.get('/', getPredictionsController.run.bind(getPredictionsController));

export default router; 

