export default function Button({ title, ...other }) {
  return (
    <button
      style={{
        marginTop: 20,
        fontWeight: "700",
        fontSize: 16,
        color: "#ffffff",
        textShadow: "#00000020 2px 2px 2px ",
      }}
      className="btn"
      {...other}
    >
      {title ? title : ""}
    </button>
  );
}
