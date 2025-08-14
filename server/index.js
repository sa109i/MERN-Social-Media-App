import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import path from 'path'
import multer from 'multer'
import helmet from 'helmet'
import { fileURLToPath } from 'url'
 
import authRoutes from './routes/authRoute.js'
import userRoutes from './routes/userRoute.js'
import postRoutes from './routes/postRoute.js'

import { registerUser } from './controllers/auth.js'
import { createPost } from './controllers/post.js'

import { verifyToken } from './middleware/auth.js'

/* CONFIGURATIONS */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(import.meta.filename);

dotenv.config({ path: '../.env' })

const app = express()

app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("tiny"))
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))


/* FILE STORAGE */
export const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, "../public/assets"))
    },
    filename: function(req, file, cb) {
        cb(null, `_${Date.now()} ${file.originalname}`)
    } 
})

const upload = multer({ storage })

app.post("/register", upload.single('cover') ,registerUser)
app.post("/posts", verifyToken, upload.single("picture"), createPost)

app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/posts', postRoutes)

const PORT = process.env.PORT

mongoose.connect(process.env.MONGO_URL)  
    .then(() => {
        console.log("connection established") 
        app.listen(PORT, () => {
            console.log(`server is listening on ${PORT}`)
        })
    })
    .catch(() => {
        console.error("unable to connected to database!")
    })


