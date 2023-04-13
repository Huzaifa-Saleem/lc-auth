import express from "express";
import cors from "cors";
import morgan from "morgan";
import env from "dotenv/config";
//
import connect from "./database/conn.js";
import router from "./router/userRouter.js";

const app = express();

/** Cors Option */
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

/** middlewares */
app.use(express.json());
app.use(morgan("dev"));
app.disable("x-powered-by");
app.use("/upload", express.static("upload"));
app.use(cors(corsOptions));

/** api Routes of User */
app.use("/api", router);

// check
app.use("/", (req, res) => {
  res.send({ message: "server is workinig" });
});

/** db connection */
connect();

/** start server */
app.listen(process.env.PORT, () => {
  console.log("server started on port ==>", process.env.PORT);
});
