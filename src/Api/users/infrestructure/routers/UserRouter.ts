import { Router } from "express";
import {
    addController,
    getByPkController,
    listController,
    autMiddleware,
    fieldValidatorMiddleware

} from "../Dependencies"

const router = Router();
router.get('/', autMiddleware.run.bind(autMiddleware),listController.run.bind(listController));
router.get('/:id', autMiddleware.run.bind(autMiddleware), getByPkController.run.bind(getByPkController));

router.post('/create',
    fieldValidatorMiddleware.runAdd.bind(fieldValidatorMiddleware),
    addController.run.bind(addController)
);

export default router;