import express, {Application, Request, Response, ErrorRequestHandler} from 'express';

const notFound = (req: Request,res:Response)=>res.send(404).send('Route does not exist');

export default notFound;