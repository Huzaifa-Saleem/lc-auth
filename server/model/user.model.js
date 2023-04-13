import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Provide a Username"],
    unique: [true, "Username Already Exist"],
    minLength: [5, "Username cannot be less then 5 Characters...!"],
  },
  password: {
    type: String,
    required: [true, "Please Provide a Password"],
    unique: false,
    minLength: [6, "Username cannot be less then 6 Characters...!"],
  },
  email: {
    type: String,
    required: [true, "Please Provide an Email"],
    unique: [true, "Email Already Exist"],
  },
  firstName: { type: String },
  lastName: { type: String },
  address: { type: String },
  mobile: { type: String },
  profile: { type: String },
  bio: { type: String },
});

export default mongoose.model.Users || mongoose.model("User", userSchema);
