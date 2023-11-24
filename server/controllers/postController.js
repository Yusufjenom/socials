import Users from "../models/User.js";
import Post from "../models/Post.js";




export const createPost= async (req, res) => {
    try {
        
    } catch (error) {
        res.status(409).json({
            success: false,
            msg: error.message
        })
    }
};


export const getFeedPosts= async (req, res) => {
    try {
        
    } catch (error) {
        
    }
};


export const getUserPosts= async (req, res) => {
    try {
        
    } catch (error) {
        
    }
};


export const likePost= async (req, res) => {
    try {
        
    } catch (error) {
        
    }
};