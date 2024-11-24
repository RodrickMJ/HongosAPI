import { Router } from "express";
import { calculateAndStoreTrends, getTrends } from "./TrendsController";

const routerTendencias = Router();

// Calcular y almacenar tendencias
routerTendencias.post("/", calculateAndStoreTrends);

// Obtener tendencias por planta
routerTendencias.get("/:id_plant", getTrends);

export default routerTendencias;
