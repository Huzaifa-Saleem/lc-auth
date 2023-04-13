import mongoose from "mongoose";

mongoose.set("strictQuery", true);
export default function connect() {
  const db = mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("mongodb connect");
    });

  return db;
}
