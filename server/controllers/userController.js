import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../model/user.model.js";
import OTPGenerator from "otp-generator";

/** MidleWare to verify user */
export async function verifyUser(req, res, next) {
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
            return res.status(400).send({ error: "Password is Incorrect...!" });

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
  const { username } = req.params;

  try {
    if (!username) return res.status(501).send({ error: "Invalid username" });

    UserModel.findOne({ username }, function (err, user) {
      if (err) return res.status(500).send({ err });
      if (!user)
        return res.status(501).send({ error: "Coudn't find the User" });

      const { password, ...rest } = Object.assign({}, user.toJSON());

      return res.status(200).send(rest);
    });
  } catch (error) {
    return res.status(404).send({ error: "Cant find the user Data" });
  }
}

/** USER PUT : http://localhost:8080/api/updateuser  */
export async function updateUser(req, res) {
  try {
    const { userId } = req.user;

    if (userId) {
      const body = req.body;

      //update the data
      UserModel.updateOne({ _id: userId }, body, function (err, data) {
        if (err) throw err;

        return res.status(201).send({ msg: "User Updated Successfuly...!" });
      });
    } else {
      return res.status(401).send({ error: "User not found...!" });
    }
  } catch (error) {
    return res.status(401).send({ error });
  }
}

/** GENERATE OTP GET : http://localhost:8080/api/generateOTP  */
export async function generateOTP(req, res) {
  req.app.locals.OTP = await OTPGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  res.status(201).send({ code: req.app.locals.OTP });
}

/** VERIFY OTP GET : http://localhost:8080/api/verifyOTP  */
export async function verifyOTP(req, res) {
  const { code } = req.query;
  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    req.app.locals.OTP = null; // reset the OTP value
    req.app.locals.resetSession = true; // start session for reset password
    return res.status(201).send({ msg: "Verify Successsfully!" });
  }
  return res.status(400).send({ error: "Invalid OTP" });
}

/** resetSESSION GET : http://localhost:8080/api/createResetSession  */
export async function createResetSession(req, res) {
  if (req.app.locals.resetSession) {
    return res.status(201).send({ flag: req.app.locals.resetSession });
  }
  return res.status(440).send({ error: "Session expired!" });
}

/** resetPass GET : http://localhost:8080/api/resetPassword  */
export async function resetPassword(req, res) {
  try {
    if (!req.app.locals.resetSession)
      return res.status(440).send({ error: "Session expired!" });
    const { username, password } = req.body;

    try {
      UserModel.findOne({ username })
        .then((user) => {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              UserModel.updateOne(
                { username: user.username },
                { password: hashedPassword },
                function (err, data) {
                  if (err) throw err;
                  req.app.locals.resetSession = false;
                  return res
                    .status(201)
                    .send({ msg: "Updated Successfully...!" });
                }
              );
            })
            .catch((error) => {
              return res.status(401).send({ error });
            });
        })
        .catch((error) => {
          return res.status(401).send({ error: "Username not found...!" });
        });
    } catch (error) {
      return res.status(401).send({ error });
    }
  } catch (error) {
    return res.status(401).send({ error });
  }
}
