import { Router } from "express";
const router = Router();
//import user Controller
import * as controller from "../controllers/userController.js";
import { registerMail } from "../controllers/mailer.js";
import Authentication, {
  localVariables,
} from "../middlewares/authentication.js";

/** POST Method */
router.route("/register").post(controller.register);
router.route("/registerMail").post(registerMail);
router.route("/authenticate").post((req, res) => res.end());
router.route("/login").post(controller.verifyUser, controller.login);

/** GET Method */
router.route("/user/:username").get(controller.getUser);
router
  .route("/generateOTP")
  .get(controller.verifyUser, localVariables, controller.generateOTP);
router.route("/verifyOTP").get(controller.verifyUser, controller.verifyOTP);
router.route("/createResetSession").get(controller.createResetSession);

/** PUT Method */
router.route("/updateuser").put(Authentication, controller.updateUser);
router
  .route("/resetPassword")
  .put(controller.verifyUser, controller.resetPassword);

export default router;
