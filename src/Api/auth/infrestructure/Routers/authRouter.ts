import { accessController, addController, patchController} from "../Dependencies";
import { Router } from "express";

const authRouter = Router();

authRouter.post('/access', accessController.run.bind(accessController))
authRouter.post('/create', addController.run.bind(addController))
authRouter.patch('/change/password', patchController.run.bind(patchController))

export default authRouter;