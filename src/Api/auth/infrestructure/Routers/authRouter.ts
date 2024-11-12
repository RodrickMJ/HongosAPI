import {
    accessController,
    findUserForPasswordResetController,
    addController,
    verifyCodeController,
    authMiddleware
} from "../Dependencies";
import { Router } from "express";

const router = Router();

router.post('/access', accessController.run.bind(accessController));
router.post('/create', addController.run.bind(addController))
router.post('/send-verification-code', findUserForPasswordResetController.run.bind(findUserForPasswordResetController));
router.post('/recive/:code', authMiddleware.run.bind(authMiddleware), verifyCodeController.run.bind(verifyCodeController));


export default router;