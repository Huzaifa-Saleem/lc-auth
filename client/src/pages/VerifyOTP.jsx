import React from "react";
import { toast } from "react-hot-toast";
//
import BgImage from "../components/BgImage";
import Card from "../components/Card";
import OtpInput from "otp-input-react";
import Meta from "../components/Meta";
import Head from "../layout/Head";
import Button from "../components/Button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  //
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/chnagePassowrd");
  };

  return (
    <div>
      <Meta title={"LC-AUTH | Login"} />
      <BgImage />
      <Head />
      <Card>
        <div>
          <h1 style={{ fontSize: 30, fontWeight: "500" }}>Verify OTP</h1>
          <p
            style={{
              fontSize: 15,
              fontWeight: "400",
              marginBottom: 30,
              marginTop: 5,
              opacity: 0.7,
            }}
          >
            An OTP has been sent to your mail...!
          </p>
          <div>
            <OtpInput
              value={otp}
              onChange={setOtp}
              autoFocus
              inputClassName="customOTPInput"
              OTPLength={6}
              style={{
                color: "black",
                margin: "0 20px 20px 20px",
              }}
              inputStyles={{
                margin: 5,
                fontSize: 18,
                width: 45,
                height: 45,
              }}
              otpType="number"
              disabled={false}
            />
          </div>

          <Button title={"SEND OTP"} onClick={handleSubmit} />
        </div>

        <div></div>
      </Card>
    </div>
  );
}
