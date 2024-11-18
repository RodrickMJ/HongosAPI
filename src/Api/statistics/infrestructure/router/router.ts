import { Router } from "express";
import {authMiddleware, getPredictionsController, reportControler} from "../Dependencies"
const router =  Router();

router.get('/', getPredictionsController.run.bind(getPredictionsController));
router.get('/report', reportControler.run.bind(reportControler));

export default router; 

