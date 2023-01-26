import mongoose from "mongoose";

mongoose.set("strictQuery", true);
export default function connect() {
  const db = mongoose.connect(
    "mongodb+srv://huzaifa:Ahsin.786@sma-cluster.oxj2omz.mongodb.net/?retryWrites=true&w=majority",
    () => {
      console.log("mongodb connect");
    }
  );

  return db;
}
