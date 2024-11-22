//StatisticRouter.ts
import { Router } from "express";
import { StatisticController } from "./StatisticController";
import { Dependencies } from "./Dependencies";

const routerStat = Router();

const statisticController = Dependencies.getStatisticController();

routerStat.post("/", (req, res) => statisticController.addStatistic(req, res));
routerStat.get("/", (req, res) => statisticController.getStatistics(req, res));
routerStat.get("/statistic/:id_plant", (req, res) => statisticController.getStatisticByPlant(req, res));

export default routerStat;
