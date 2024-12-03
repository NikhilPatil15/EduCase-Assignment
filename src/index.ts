import express, {Request,Response} from 'express'
import dotenv from 'dotenv'
import { connectDatabase } from './Database/dbConnection';
import cors from "cors";

const app = express()
dotenv.config({ path: "./.env" });

app.use(express.json())

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

connectDatabase().then(()=>{
    console.log("Database connected Successfully!");
})

const port = process.env.PORT || 6080

app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
})

app.get("/",(req:Request,res:Response) => {
    res.send("Health Check route!")
})

import schoolRouter from './routes/school.route'

// console.log("SchoolRouter: ", schoolRouter);

app.use("/api/v1/school",schoolRouter)


