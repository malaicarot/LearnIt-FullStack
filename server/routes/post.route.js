import express from 'express';
import { PostController } from '../controller/post.controller.js';
import verifyToken from '../middleware/verifyToken.middleware.js';

const PostRouter = express.Router();


PostRouter.get('/getAll',verifyToken, PostController.getAll);


PostRouter.post('/create',verifyToken, PostController.createPost);

PostRouter.put('/update/:postId', verifyToken, PostController.updatePost);

PostRouter.delete('/delete/:postId',verifyToken, PostController.deletePost);


export {PostRouter};