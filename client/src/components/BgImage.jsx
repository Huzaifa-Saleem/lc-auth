import bg from "../assets/bg.png";

const bgStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  overflow: "hidden",
  zIndex: -1,
};

export default function BgImage() {
  return (
    <div>
      <img style={bgStyle} src={bg} alt="" />
    </div>
  );
}
