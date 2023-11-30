import express from 'express';
import {getUserPosts, getFeedPosts, likePost} from '../controllers/postController.js';
import {isVerified} from '../middleware/authorization.js';

const postRouter = express.Router();



postRouter.get('/posts', getFeedPosts);

postRouter.get('/:userId/posts', getFeedPosts);

postRouter.put('/:id/like', likePost);


export default postRouter;