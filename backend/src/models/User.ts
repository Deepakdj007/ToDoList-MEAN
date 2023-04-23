import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: [3, "Name must be at least 3 characters long"],
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: [true, "Email already in use"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
  password:{
    type:String,
    required: [true, "Please provide password"],
    minlength: [6, "Password must be at least 6 characters long"],
    select:false
  },
});

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

UserSchema.methods.createJWT = function () {
    const secretKey:string = process.env.JWT_SECRET!;

    return jwt.sign(
        { userId: this._id, name: this.name },
        secretKey,
        {
          expiresIn: process.env.JWT_LIFETIME,
        }
      )
}

UserSchema.methods.comparePassword = async function (candidatePassword:string){
    const isMatch = await bcrypt.compare(candidatePassword,this.password);
    return isMatch;
}

const User = mongoose.model("User", UserSchema);
export default User;