import express from 'express';
import morgan from 'morgan';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

 const app=express();

 app.use(express.json());
  app.use(morgan('dev'))
 app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
 app.use(cors({
  origin: "http://localhost:5173", // allow frontend
  credentials: true
}));

app.get("/api/home", (req, res) => {
  res.json({ message: "Hello from backend 3301!" });
});

app.use("/api/auth",authRouter)

 export default app;    