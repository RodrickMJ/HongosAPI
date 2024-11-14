import { Router } from "express";
import {
    accessController,
    findUserForPasswordResetController,
    addController,
    verifyCodeController,
    authMiddleware,
    resetPasswordController
} from "../Dependencies";


const router = Router();

router.post(
    '/access',
    accessController.run.bind(accessController));

router.post(
    '/create',
    addController.run.bind(addController));

router.post(
    '/send-verification-code',
    findUserForPasswordResetController.run.bind(findUserForPasswordResetController));

router.post(
    '/recive/:code',
    authMiddleware.run.bind(authMiddleware),
    verifyCodeController.run.bind(verifyCodeController));

router.post(
    '/reset-password',
    authMiddleware.run.bind(authMiddleware),
    resetPasswordController.run.bind(resetPasswordController))

export default router;