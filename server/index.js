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
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/assets')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage }) 


app.post('/auth/register', upload.single('cover'), register)


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


