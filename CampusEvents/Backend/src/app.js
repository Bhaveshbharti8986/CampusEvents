import express from 'express';
import morgan from 'morgan';
import authRouter from './routes/auth.routes.js';
import eventRouter from './routes/events.routes.js';
import notificationRouter from './routes/notification.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

 const app=express();
 app.use(cors({
  origin: "http://localhost:5173",// allow frontend
  credentials: true
}));



 app.use(express.json());
  app.use(morgan('dev'))
 app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


//  auth routes middleware
app.use("/api/auth",authRouter)
//  events routes middleware 
app.use("/api/events",eventRouter)

app.use('/api/notification',notificationRouter);


 export default app;    