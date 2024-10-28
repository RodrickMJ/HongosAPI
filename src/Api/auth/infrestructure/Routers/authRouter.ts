import { accessController,updatePasswordController} from "../Dependencies";
import { Router } from "express";

const authRouter = Router();

authRouter.post('/access', accessController.run.bind(accessController))
authRouter.patch('/changePassword', updatePasswordController.run.bind(updatePasswordController))


export default authRouter;