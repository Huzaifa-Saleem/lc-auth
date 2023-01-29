import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
//
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import Meta from "../components/Meta";
import { getUserDetail, updatedUser } from "../helper/ApiFn";
//

export default function Profile() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [num, setNum] = useState("");
  const [address, setAddress] = useState("");
  const [file, setFile] = useState();
  //
  const navigate = useNavigate();
  const { username } = useParams();

  useEffect(() => {
    getUserDetail(username)
      .then((res) => {
        setUser(res?.data?.username);
        setEmail(res?.data?.email);
        setNum(res?.data?.mobile);
        setFile(res?.data?.profile);
        setAddress(res?.data?.address);
      })
      .catch((error) => {
        toast.error(error.message);
        // console.log(error);
      });
  }, [username]);

  const handleUpdate = () => {
    updatedUser({ username: user, email, address, mobile: num, profile: file })
      .then((res) => toast.success(res?.data.msg))
      .catch((error) => toast.error(error.data));
  };

  return (
    <div>
      <Meta title={"LC-AUTH | Login"} />

      <Card>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: 30, fontWeight: "400" }}>
            Welcome <span style={{ fontWeight: "600" }}>{username}</span>
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
            You can check or update your details here
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
              onChange={(e) => setFile(URL.createObjectURL(e.target.files[0]))}
              type="file"
              id="profile"
              name="profile"
            />
          </div>
          <Input
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setUser(e.target.value);
            }}
            value={user}
            icon="user"
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
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
            value={num}
            icon="phone"
            placeholder="Phone No."
          />
          <Input
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            type="text"
            value={address}
            icon="location"
            placeholder="Address"
          />

          <Button title="UPDATE" onClick={handleUpdate} />
        </div>

        <div>
          <p
            style={{
              fontSize: 15,
              fontWeight: "400",
              marginTop: 20,
              opacity: 0.7,
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            LOGOUT
          </p>
        </div>
      </Card>
    </div>
  );
}
