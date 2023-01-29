import {
  MdEmail,
  MdLocationPin,
  MdPerson,
  MdSmartphone,
  MdVpnKey,
} from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";

export default function Input({ type, value, icon, sty, ...other }) {
  const [passVisible, setPassVisible] = useState(true);

  //return pass visible or not icon
  const PassIcon = passVisible ? (
    <AiFillEye
      color="white"
      className="eyeIcon"
      size={18}
      onClick={() => {
        setPassVisible(!passVisible);
      }}
      style={{
        position: "absolute",
        marginTop: 20,
        marginLeft: "88%",
        opacity: 0.7,
        cursor: "pointer",
      }}
    />
  ) : (
    <AiFillEyeInvisible
      color="white"
      className="eyeIcon"
      size={18}
      onClick={() => {
        setPassVisible(!passVisible);
      }}
      style={{
        position: "absolute",
        marginTop: 20,
        marginLeft: "88%",
        opacity: 0.7,
        cursor: "pointer",
      }}
    />
  );

  return (
    <div style={{ position: "relative", transition: "all .3s ease-in-out" }}>
      {/* ------ set icon in input */}
      {icon === "user" ? (
        <MdPerson
          color="white"
          size={20}
          style={{
            position: "absolute",
            marginTop: 18,
            marginLeft: 14,
            opacity: 0.7,
          }}
        />
      ) : icon === "email" ? (
        <MdEmail
          color="white"
          size={20}
          style={{
            position: "absolute",
            marginTop: 18,
            marginLeft: 14,
            opacity: 0.7,
          }}
        />
      ) : icon === "password" ? (
        <MdVpnKey
          color="white"
          size={20}
          style={{
            position: "absolute",
            marginTop: 18,
            marginLeft: 14,
            opacity: 0.7,
          }}
        />
      ) : icon === "location" ? (
        <MdLocationPin
          color="white"
          size={20}
          style={{
            position: "absolute",
            marginTop: 18,
            marginLeft: 14,
            opacity: 0.7,
          }}
        />
      ) : icon === "phone" ? (
        <MdSmartphone
          color="white"
          size={20}
          style={{
            position: "absolute",
            marginTop: 18,
            marginLeft: 14,
            opacity: 0.7,
          }}
        />
      ) : null}

      {icon === "password" && PassIcon}

      <input
        type={passVisible ? type : "text"}
        value={value}
        style={{ paddingLeft: icon ? 45 : 20 }}
        className="customInput"
        {...other}
      />
    </div>
  );
}
