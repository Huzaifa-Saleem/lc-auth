import React from "react";
import { toast } from "react-hot-toast";
//
import BgImage from "../components/BgImage";
import Card from "../components/Card";
import Input from "../components/Input";
import Meta from "../components/Meta";
import Head from "../layout/Head";
import Button from "../components/Button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassInput, setShowPassInput] = useState(false);

  //
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username !== "" && !showPassInput) {
      return setShowPassInput(true);
    } else if (username === "") {
      return toast.error("Please enter your Username ...!", {
        duration: 1400,
        style: {
          background: "#101010",
          color: "rgba(255,255,255,.5)",
        },
      });
    } else if (password === "") {
      return toast.error("Please enter your Password ...!", {
        duration: 1400,
        style: {
          background: "#101010",
          color: "rgba(255,255,255,.5)",
        },
      });
    }

    //controll inputs
    navigate(`/user/${username}`);
  };

  return (
    <div>
      <Meta title={"LC-AUTH | Login"} />
      <BgImage />
      <Head />
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
          <Input
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            icon="user"
          />
          {showPassInput && (
            <>
              {" "}
              <Input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
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
          <Button title={"SIGN IN"} onClick={handleSubmit} />
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
