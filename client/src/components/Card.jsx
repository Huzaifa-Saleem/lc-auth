export default function Card({ children }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70%",
      }}
    >
      <div
        style={{
          background: " rgba(255, 255, 255, 0.1)",
          borderRadius: 16,
          padding: "10vh",
          // paddingTop: 0,
          color: "white",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(4.1px)",
          // marginBottom:30
        }}
      >
        {children}
      </div>
    </div>
  );
}
