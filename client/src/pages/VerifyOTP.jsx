import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
//
import Card from "../components/Card";
import OtpInput from "otp-input-react";
import Meta from "../components/Meta";
import Button from "../components/Button";
import { SendOTP, VerifyPassOTP } from "../helper/ApiFn";
//

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  //
  const navigate = useNavigate();
  const { username } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    //check otp input
    if (otp.split("").length !== 6)
      return toast.error("PLease Enter your OTP...!", { id: "OTP" });

    toast.loading("loading...", { id: "OTP" });

    VerifyPassOTP({ username, OTP: otp })
      .then((res) => {
        toast.success("OTP Verified...!", { id: "OTP" });
        navigate(`/chnagePassword/${username}`);
      })
      .catch((error) =>
        toast.error(error?.response?.data?.error, { id: "OTP" })
      );
  };

  const HandleResendOTP = () => {
    toast.loading("loading...", { id: "ResendOTP" });

    SendOTP(username)
      .then((res) =>
        toast.success("OTP has been send to your Email...!", {
          id: "ResendOTP",
        })
      )
      .catch((error) => {
        toast.error("Something went wrong...!", { id: "ResendOTP" });
      });
  };

  return (
    <div>
      <Meta title={"LC-AUTH | Verify OTP"} />

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
          <form onSubmit={handleSubmit}>
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

            <Button title={"VERIFY OTP"} onClick={handleSubmit} />
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
              color: "#18dad0",
              cursor: "pointer",
            }}
            onClick={HandleResendOTP}
          >
            Resend OTP
          </p>
        </div>
      </Card>
    </div>
  );
}
