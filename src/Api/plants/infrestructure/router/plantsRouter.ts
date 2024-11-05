import { Router } from "express";
import {
    addController,
    authMiddleware,
    deleteController,
    fieldValidatorMiddleware,
    getByPkController,
    listController
} from '../Dependecies';

const router = Router();

router.get('/', authMiddleware.run.bind(authMiddleware), listController.run.bind(listController));
router.get('/:id',
    authMiddleware.run.bind(authMiddleware),
    fieldValidatorMiddleware.pk.bind(fieldValidatorMiddleware),
    getByPkController.run.bind(getByPkController));

router.post('/',
    authMiddleware.run.bind(authMiddleware),
    fieldValidatorMiddleware.add.bind(fieldValidatorMiddleware),
    addController.run.bind(addController));

router.delete('/:id', authMiddleware.run.bind(authMiddleware),
    fieldValidatorMiddleware.pk.bind(fieldValidatorMiddleware),
    deleteController.run.bind(deleteController))


export default router;