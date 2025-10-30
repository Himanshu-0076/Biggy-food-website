import express from "express"
import dotenv from "dotenv"
dotenv.config()
import cookieParser from "cookie-parser"
import cors from "cors"
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
const app  = express()
const port = process.env.PORT || 4000
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRouter)



app.listen(port,()=>{
    connectDb()
    console.log(`server started at ${port}`)
})