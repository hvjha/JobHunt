import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRoutes from './routes/user.route.js';
import companyRoutes from './routes/company.route.js'
import jobRoutes from './routes/job.route.js'
import applicationRoutes from './routes/application.route.js'
import path from 'path';
dotenv.config({});

const app = express();
const  __dirname = path.resolve();
// console.log(__dirname);

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin: 'process.env.URL',
    credentials: true,
 };
app.use(cors(corsOptions));
const PORT = process.env.PORT || 3000;

app.use("/api/v1/user",userRoutes)
app.use("/api/v1/company",companyRoutes);
app.use("/api/v1/job",jobRoutes);
app.use("/api/v1/application",applicationRoutes);

app.use(express.static(path.join(__dirname,"/frontend/dist")));
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
})
app.listen(PORT,()=>{
    connectDB();
    console.log(`server is running on port ${PORT}`);
})


