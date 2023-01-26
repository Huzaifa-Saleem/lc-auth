import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../model/user.model.js";

/** MidleWare to verify user */
export async function verifyUser(req, res) {
  try {
    const { username } = req.method == "GET" ? req.query : req.body;

    // check the user existance
    let exist = await UserModel.findOne({ username });
    if (!exist) return res.status(404).send({ error: "Can't find User!" });
    next();
  } catch (error) {
    return res.status(404).send({ error: "Authentication Error" });
  }
}

/** REGISTER POST : http://localhost:8080/api/register 
  @param
  {
  "username":"huzaifa",
  "password":"huzaifa",
  "email":"huzaifa.saleem3111@gmail.com",
  "profile":""
}
 */
export async function register(req, res) {
  try {
    const { username, password, profile, email } = req.body;

    // check the existing user
    const existUsername = new Promise((resolve, reject) => {
      UserModel.findOne({ username }, function (err, user) {
        if (err) reject(new Error(err));
        if (user) reject({ error: "Please use unique username" });

        resolve();
      });
    });

    // check for existing email
    const existEmail = new Promise((resolve, reject) => {
      UserModel.findOne({ email }, function (err, email) {
        if (err) reject(new Error(err));
        if (email) reject({ error: "Please use unique Email" });

        resolve();
      });
    });

    Promise.all([existUsername, existEmail])
      .then(() => {
        if (password) {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              const user = new UserModel({
                username,
                password: hashedPassword,
                profile: profile || "",
                email,
              });

              // return save result as a response
              user
                .save()
                .then((result) =>
                  res.status(201).send({ msg: "User Register Successfully" })
                )
                .catch((error) => res.status(500).send({ error }));
            })
            .catch((error) => {
              return res.status(500).send({
                error: "Enable to hashed password",
              });
            });
        }
      })
      .catch((error) => {
        return res.status(500).send({ error });
      });
  } catch (error) {
    return res.status(500).send(error);
  }
}

/** LOGIN POST : http://localhost:8080/api/login  */
export async function login(req, res) {
  const { username, password } = req.body;

  try {
    UserModel.findOne({ username }).then((user) => {
      bcrypt
        .compare(password, user.password)
        .then((passwordCheck) => {
          if (!passwordCheck)
            return res.status(400).send({ error: "Don't have Password" });

          //create jwt token
          const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,
            {
              expiresIn: "24h",
            }
          );

          return res.status(201).send({
            msg: "Login Successful",
            username: user.username,
            token,
          });
        })
        .catch((error) => {
          return res.status(404).send({ error: "Password does not Match" });
        });
    });
  } catch (error) {
    return res.status(500).send({ error });
  }
}

/** USER GET : http://localhost:8080/api/user/:username  */
export async function getUser(req, res) {
  res.json("register route");
}

/** USER PUT : http://localhost:8080/api/updateuser  */
export async function updateUser(req, res) {
  res.json("register route");
}

/** OTP GET : http://localhost:8080/api/generateOTP  */
export async function generateOTP(req, res) {
  res.json("register route");
}

/** OTP GET : http://localhost:8080/api/verifyOTP  */
export async function verifyOTP(req, res) {
  res.json("register route");
}

/** resetSESSION GET : http://localhost:8080/api/createResetSession  */
export async function createResetSession(req, res) {
  res.json("register route");
}

/** resetPass GET : http://localhost:8080/api/resetPassword  */
export async function resetPassword(req, res) {
  res.json("register route");
}
