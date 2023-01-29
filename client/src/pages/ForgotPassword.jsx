import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
//
import Card from "../components/Card";
import Input from "../components/Input";
import Meta from "../components/Meta";
import Button from "../components/Button";
import { SendOTP } from "../helper/ApiFn";
//

export default function ForgotPassword() {
  const [username, setUsername] = useState("");
  //
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.loading("loading...", { id: "OTP" });

    //check username
    if (username === "") return toast.error("Please Enter Your Username...!");

    //sending OTP
    SendOTP(username)
      .then((res) => {
        toast.success("Please Check Your Email For OTP...!", { id: "OTP" });
        navigate(`/verifyotp/${username}`);
      })
      .catch((error) =>
        toast.error(error?.response?.data?.error, { id: "OTP" })
      );
  };

  return (
    <div>
      <Meta title={"LC-AUTH | Forgot Password"} />

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
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              icon="user"
            />

            <Button title={"SEND OTP"} onClick={handleSubmit} />
          </form>
        </div>

        <div></div>
      </Card>
    </div>
  );
}
