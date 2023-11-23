import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Users from '../models/User.js';

export const register = async (req, res) => {
    try {
        const { firstname, lastname, email, password, picturePath,
            friends, location, occupation } = req.body
    } catch (error) {

    }
}