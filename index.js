import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoute from './routes/auth.js'
import tweetRoute from './routes/tweet.js'
import commentRoute from './routes/comment.js'


dotenv.config()

const app = express()
const Port = process.env.PORT || 8000

//database conection
mongoose.set("strictQuery", false);
const connect = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017');
        console.log("MongoDB connection successful");
    } catch (err) {
        console.log("MongoDB connection failed:", err);
    }
}

//middlewear
app.use(express.json())
app.use(cors())
app.use(cookieParser())


app.use('/api', authRoute);
app.use('/api', tweetRoute);
app.use('/api', commentRoute);


app.listen(Port, () => {
    connect()
    console.log('server listening on port', Port);
})