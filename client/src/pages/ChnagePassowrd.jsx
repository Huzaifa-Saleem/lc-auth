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

export default function ChnagePassowrd() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/");
  };

  return (
    <div>
      <Meta title={"LC-AUTH | Login"} />
      <BgImage />
      <Head />
      <Card>
        <div>
          <h1 style={{ fontSize: 30, fontWeight: "500" }}>Change Password</h1>
          <p
            style={{
              fontSize: 15,
              fontWeight: "400",
              marginBottom: 30,
              marginTop: 5,
              opacity: 0.7,
            }}
          >
            Enter your New Password...!
          </p>
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            icon="password"
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            icon="password"
          />

          <Button title={"CHANGE PASSWORD"} onClick={handleSubmit} />
        </div>

        <div></div>
      </Card>
    </div>
  );
}
