import express from "express";
import cors from "cors";
import morgan from "morgan";
import env from "dotenv/config";
//
import connect from "./database/conn.js";
import router from "./router/userRouter.js";

const app = express();

/** middlewares */
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.disable("x-powered-by");

const PORT = 8080;

/** http get request */
app.get("/", (req, res) => {
  res.status(200).json("get response HOME");
});

/** api Routes of User */
app.use("/api", router);

/** db connection */
connect();

/** start server */
app.listen(PORT, () => {
  console.log("server started on port ==>", PORT);
});
