import express, {Application, Request, Response} from 'express';

import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });

import helmet from 'helmet';
import cors from 'cors';
const xss = require('xss-clean');
import rateLimiter  from 'express-rate-limit';

const app:Application = express();
const port:string|number = process.env.PORT || 3000;


import connectDB from './db/connect';
import auth from './middleware/authentication';

import authRouter from './routes/auth';

import notFound from './middleware/not-found';
import errorHandlerMiddleware from './middleware/error-handler';

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
// Use helmet to set various HTTP headers for security
app.use(helmet());

// Use cors to enable Cross-Origin Resource Sharing
app.use(cors());

// Use xssClean to sanitize user input
app.use(xss());


//routes

app.use('/api/v1/auth', authRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try{
    const mongo_uri = process.env.MONGO_URI as string;
    await connectDB(mongo_uri);
    app.listen(port, ()=>{
      console.log(`Server is listening on port ${port}`);
    });
  }catch(err){
    console.log(err);
  }
};

start();



