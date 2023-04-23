import express, {Application, Request, Response} from 'express';

import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });

import helmet from 'helmet';
import cors from 'cors';
import xss from 'xss-clean';
import { rateLimit } from 'express-rate-limit';

const app:Application = express();
const port:string|number = process.env.PORT || 3000;


import connectDB from './db/connect';

// Use helmet to set various HTTP headers for security
app.use(helmet());

// Use cors to enable Cross-Origin Resource Sharing
app.use(cors());

// Use xssClean to sanitize user input
app.use(xss());

// Use rateLimit to limit the number of requests per IP address
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));



