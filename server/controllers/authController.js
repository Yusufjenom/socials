import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Users from '../models/User.js';

export const register = async (req, res) => {
    try {
        const { firstname,
            lastname,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new Users({
            firstname,
            lastname,
            email,
            password: hashPassword,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 1000)
        });
        const savesUser = await newUser.save();

        res.status(201).json({
            success: true,
            savesUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            mgs: error.message
        });
    }
};


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });
        if (user) {
            const isPassword = await bcrypt.compare(password, user.password);
            if (isPassword) {
                await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" },
                    async (err, token) => {
                        await delete user.password;
                        res.status(200).json({
                            success: true,
                            user,
                            token
                        })
                    })
            } else {
                throw new Error("Incorrect Password")
            }
        } else {
            throw new Error("this user does not exist")
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message
        })
    }
};