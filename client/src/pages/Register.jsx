import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
//
import Card from "../components/Card";
import Input from "../components/Input";
import Meta from "../components/Meta";
import Button from "../components/Button";
import { RegisterUser } from "../helper/ApiFn";
//

export default function Register() {
  const [file, setFile] = useState();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //
  const navigate = useNavigate();

  const data = { username, password, email, profile: file };

  //handle submit
  const handleSubmit = () => {
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    )
      return toast.error("Please Fill All Fields...!");

    //check password matching
    if (password !== confirmPassword)
      return toast.error("Password Doesn't Match...!", {
        id: 1,
        duration: 10000,
      });

    toast.loading("loading...!");
    RegisterUser(data)
      .then((res) => {
        toast.success("Register Successfully...!", { id: 1 });

        navigate("/");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error?.error, { id: 1 });
      });
  };

  //handle file input
  const onUpload = async (e) => {
    // const base64 = await convertToBase64(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <div>
      <Meta title={"LC-AUTH | Register"} />
      <Card>
        <div>
          <h1 style={{ fontSize: 30, fontWeight: "500" }}>
            Create Your Account
          </h1>
          <p
            style={{
              fontSize: 15,
              fontWeight: "400",
              marginBottom: 30,
              marginTop: 5,
              opacity: 0.7,
            }}
          >
            Enter your credentials to continue...!
          </p>
          <div
            style={{ display: "flex", justifyContent: "center" }}
            className="profile"
          >
            <label htmlFor="profile">
              <img
                src={
                  file ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                }
                className="profile_img"
                alt="avatar"
              />
            </label>

            <input
              onChange={onUpload}
              type="file"
              id="profile"
              name="profile"
            />
          </div>
          <Input
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            icon="user"
          />
          <Input
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            icon="email"
          />

          <Input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            icon="password"
            placeholder="Password"
          />
          <Input
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            type="password"
            icon="password"
            placeholder="Confirm Password"
          />

          <Button title="SIGN UP" onClick={handleSubmit} />
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
            Already have an account?{" "}
            <Link style={{ color: "#18dad0" }} to={"/"}>
              Sign In
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
