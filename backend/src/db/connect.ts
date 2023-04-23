import mongoose, { ConnectOptions } from "mongoose";

const conectDB = (url:string)=>{
    return mongoose.connect(url,{
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    } as ConnectOptions)
}

export default conectDB;