import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { buffer } from "stream/consumers";


interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createJWT(): string;
  comparePassword(password:any):any;
}

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
    select:false,
    minlength: [6, "Password must be at least 6 characters long"]
  },
  profilePicture: {
    data:buffer,
    contentType:String,
    default: null, // Set a default value of null for the profile picture field
  },
});

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

UserSchema.methods.createJWT = function () {
    const secretKey = process.env.JWT_SECRET as string;

    return jwt.sign(
        { userId: this._id, name: this.name },
        secretKey,
        {
          expiresIn: process.env.JWT_LIFETIME,
        }
      )
}

UserSchema.methods.comparePassword = async function (candidatePassword:any){
  let returneduser:any;
   await User.findOne({email: this.email}).select('password').exec().then(async (result:any)=>{
    returneduser = result
  })
  const isMatch = await bcrypt.compare(candidatePassword,returneduser?.password);
  console.log("isMatch: " + isMatch)
  return isMatch
  // console.log("candidatePassword:", candidatePassword); // Add this line  
  // const isMatch = await bcrypt.compare(candidatePassword,this.password);
  //   return isMatch;
}

const User = mongoose.model<IUser>("User", UserSchema);
export default User;