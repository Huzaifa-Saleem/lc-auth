import logo from "../assets/logo.svg";

export default function Head() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: " -20px 0 25px 0",
          height: "18vh",
        }}
      >
        <img src={logo} width={50} alt="logo" />
      </div>
    </div>
  );
}
