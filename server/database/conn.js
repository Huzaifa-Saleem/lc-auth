import mongoose from "mongoose";

mongoose.set("strictQuery", true);
export default function connect() {
  const db = mongoose.connect(process.env.PORT, () => {
    console.log("mongodb connect");
  });

  return db;
}
