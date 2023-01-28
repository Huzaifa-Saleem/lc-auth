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

export default function ForgotPassword() {
  const [username, setUsername] = useState("");
  //
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/verifyotp");
  };

  return (
    <div>
      <Meta title={"LC-AUTH | Login"} />
      <BgImage />
      <Head />
      <Card>
        <div>
          <h1 style={{ fontSize: 30, fontWeight: "500" }}>Forgot Password</h1>
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

          <Button title={"SEND OTP"} onClick={handleSubmit} />
        </div>

        <div></div>
      </Card>
    </div>
  );
}
