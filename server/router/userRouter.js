import { Router } from "express";
import multer from "multer";
const router = Router();
//import user Controller
import * as controller from "../controllers/userController.js";
import { registerMail } from "../controllers/mailer.js";
import Authentication, {
  localVariables,
} from "../middlewares/authentication.js";

/** MULTER CONFIG */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

/** POST Method */
router.route("/register").post(upload.single("profile"), controller.register);
router.route("/registerMail").post(registerMail);
router
  .route("/authenticate")
  .post(controller.verifyUser, (req, res) => res.end());
router.route("/login").post(controller.verifyUser, controller.login);
router.route("/file").post(upload.single("avat"), (req, res) => {
  res.send({ file: req.file });
});

/** GET Method */
router.route("/user/:username").get(controller.getUser);
router.route("/getusers").get(controller.getAllUsers);
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
