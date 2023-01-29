import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
//
import Card from "../components/Card";
import Input from "../components/Input";
import Meta from "../components/Meta";
import Button from "../components/Button";
import { loginUser, VerifyUser } from "../helper/ApiFn";
//

/** toast option  */

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassInput, setShowPassInput] = useState(false);
  //
  const navigate = useNavigate();

  /**handle username submit  */
  const handleUsernameSubmit = (e) => {
    e.preventDefault();

    // show passowrd input condition
    if (username === "") {
      return toast.error("Please enter your Username ...!");
    }

    // Verify Username
    VerifyUser(username)
      .then((res) => {
        // if username verified then
        console.log(res);
        toast.success("User Authenticated...!");
        return setShowPassInput(true);
      })
      .catch((err) => {
        //if username not verified
        console.log(err);
        toast.error(err?.error);
        return setShowPassInput(false);
      });
  };

  /** handle login */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === "") {
      return toast.error("Please enter your Password ...!");
    }

    loginUser({ username, password })
      .then((res) => {
        console.log(res.data);
        toast.success(`Welcome ${res?.data?.username}`);
        localStorage.setItem("token", res?.data?.token);
        navigate(`/user/${username}`);
      })
      .catch((err) => {
        return toast.error("Wrong Credentials ...!");
      });
  };

  return (
    <div>
      <Meta title={"LC-AUTH | Login"} />
      <Card>
        <div>
          <h1 style={{ fontSize: 30, fontWeight: "500" }}>Sign In</h1>
          <p
            style={{
              fontSize: 15,
              fontWeight: "400",
              marginBottom: 30,
              marginTop: 5,
              opacity: 0.7,
            }}
          >
            Enter your Credentials to continue...!
          </p>
          <form onSubmit={showPassInput ? handleSubmit : handleUsernameSubmit}>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              icon="user"
            />
            {showPassInput && (
              <>
                <Input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                  type="password"
                  icon="password"
                  placeholder="Password"
                />
                <div style={{ textAlign: "end", marginRight: 10 }}>
                  <Link
                    to="forgotPassword"
                    style={{
                      fontSize: 12,
                      fontWeight: "400",
                      opacity: 0.7,
                      color: "#18dad0",
                    }}
                  >
                    Forgot Password
                  </Link>
                </div>
              </>
            )}
            <Button
              title={"SIGN IN"}
              onClick={showPassInput ? handleSubmit : handleUsernameSubmit}
            />
          </form>
        </div>

        <div>
          <p
            style={{
              fontSize: 15,
              fontWeight: "400",
              marginTop: 20,
              opacity: 0.7,
              textAlign: "center",
            }}
          >
            Don't have an account?{" "}
            <Link style={{ color: "#18dad0" }} to={"/register"}>
              Sign Up
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
