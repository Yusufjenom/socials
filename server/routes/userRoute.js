import express from 'express';
import {
    getUser,
    getUserFriends,
    addRemoveFriend
} from '../controllers/userController.js';
import {isVerified} from '../middleware/authorization.js';

const userRouter = express.Router();

userRouter.get('/:id', getUser);

userRouter.get('/:id/friends', getUserFriends);

userRouter.put('/:id/:friendId', addRemoveFriend);



export default userRouter;