import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
//
import Card from "../components/Card";
import Input from "../components/Input";
import Meta from "../components/Meta";
import Button from "../components/Button";
import { ChnagePass } from "../helper/ApiFn";
//

export default function ChnagePassowrd() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //
  const navigate = useNavigate();
  const { username } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.error("Loading...!", { id: "ChangePass" });
    // check pass
    if (password === "" || confirmPassword === "")
      return toast.error("Please Fill All Fields...!", { id: "ChangePass" });
    if (password !== confirmPassword)
      return toast.error("Password Doesn,t Match...!", { id: "ChangePass" });

    //change pass
    ChnagePass({ username, password })
      .then((res) => {
        toast.success(res?.msg, { id: "ChangePass" });
        navigate("/");
      })
      .catch(() => toast.error("OTP not verified...!", { id: "ChangePass" }));
  };

  return (
    <div>
      {/* Page Title */}
      <Meta title={"LC-AUTH | Change Password"} />

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
          <form onSubmit={handleSubmit}>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              icon="password"
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              icon="password"
            />

            <Button title={"CHANGE PASSWORD"} onClick={handleSubmit} />
          </form>
        </div>

        <div></div>
      </Card>
    </div>
  );
}
