import Users from "../models/User.js";
import Post from "../models/Post.js";




export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await Users.findById(userId);

        const newPost = new Post({
            userId,
            firstname: user.firstname,
            lastname: user.lastname,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        });

        await newPost.save();
        const posts = await Post.find();
        res.status(201).json({
            success: true,
            posts
        })
    } catch (error) {
        res.status(409).json({
            success: false,
            msg: error.message
        })
    }
};


export const getFeedPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({
            success: true,
            posts
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            msg: error.message
        })
    }
};


export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await Post.find({ userId });
        res.status(200).json({
            success: true,
            posts
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            msg: error.message
        })
    }
};


export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(id, {
            likes: post.likes
        }, { new: true });

        res.status(200).json({
            success: true,
            updatedPost
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            msg: error.message
        })
    }
};