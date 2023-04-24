import mongoose, { ConnectOptions } from "mongoose";

const conectDB = (url:string)=>{
    return mongoose.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions)
}

export default conectDB;