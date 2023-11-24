import express from 'express';
import {register, loginUser} from '../controllers/authController.js';
const authRouter = express.Router();


authRouter.post('/login-user', loginUser);


export default authRouter;