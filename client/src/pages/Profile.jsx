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

export default function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [num, setNum] = useState("");
  const [address, setAddress] = useState("");
  const [file, setFile] = useState();

  //
  const navigate = useNavigate();

  //handle file input
  const onUpload = async (e) => {
    // const base64 = await convertToBase64(e.target.files[0]);

    setFile(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <div>
      <Meta title={"LC-AUTH | Login"} />
      <BgImage />
      <Head />
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
              setNum(e.target.value);
            }}
            type="text"
            icon="phone"
            placeholder="Phone No."
          />
          <Input
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            type="text"
            icon="location"
            placeholder="Address"
          />

          <Button
            title="UPDATE"
            onClick={() => {
              navigate("/");
            }}
          />
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
