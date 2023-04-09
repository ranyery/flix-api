import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const hash = await bcrypt.hash(this.password, SALT_ROUNDS);
  this.password = hash;
  next();
});

userSchema.methods.checkPassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
