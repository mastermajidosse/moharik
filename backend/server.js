import express from 'express'
import dotenv from "dotenv"
import connectDb from './config/connectDb.js'
import motosRoutes from './routes/motoRoutes.js'
import singleUploadRoutes from './routes/singleUpload.js'
import multipleUploadRoutes from './routes/multipleUpload.js'
import postRoutes from './routes/postRoutes.js'
import userRoutes from './routes/userRoutes.js'
import bodyParser from 'body-parser'
import cors from "cors"

const app = express()
app.use(cors({
   origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}))
app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: true
  }))
app.use(bodyParser.json({
    limit: '4mb'
}))
dotenv.config()
connectDb()

app.get('/',(req,res) => res.send("Api is running..."))
app.use("/api/motos",motosRoutes)
app.use("/api/uploads",singleUploadRoutes)
app.use("/api/uploads",multipleUploadRoutes)
app.use("/api/posts",postRoutes)
app.use("/api/users",userRoutes)

const PORT = process.env.port || 9000
app.listen(PORT,console.log(`Server is running on ${PORT} in ${process.env.NODE_ENV} mode...`))