import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import { connectDB } from './database/db.js';
import { register } from './controllers/authController.js';
import authRouter from './routes/authRoute.js';
import userRouter from './routes/userRoute.js';
import postRouter from './routes/postRoutes.js';
import {createPost} from './controllers/postController.js';
import {isVerified} from './middleware/authorization.js';


//Middlewares
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(cors());
app.use('assets', express.static(path.join(__dirname, "public/assets")));
app.use('/api/v1', authRouter);
app.use('/api/v1', userRouter);
app.use('/api/v1', postRouter);


//file storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

//file routes
app.post('/auth/register', upload.single('picture'), register);
app.post('/posts', upload.single("picture"), createPost)


async function connectToDb() {
    try {
        await connectDB()
        app.listen(process.env.PORT, () => console.log(`server running on port ${process.env.PORT}`))

    } catch (error) {
        console.log(error)
    }
};

connectToDb();