import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import multer from 'multer';
import path from 'path';
import {fileURLToPath} from 'url';
import bodyParser from 'body-parser';
import {connectDB} from './database/db.js';

//Middlewares
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(cors());
app.use('assets', express.static(path.join(__dirname, "public/assets")));


//file storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/assets")
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});

const upload = multer({storage});


async function connectToDb(){
    try {
         await connectDB()
        
        await app.listen(process.env.PORT, () => console.log(`server running on port ${process.env.PORT}`))
        

    } catch (error) {
        console.log(error)
    }
};

connectToDb();