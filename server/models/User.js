import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    lastname:{
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    email:{
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password:{
        type: String,
        required: true,
        min: 5,
    },
    picturePath:{
        type: String,
        default: "",
    },
    friends:{
        type: Array,
        default: []
    },
    location:{
        type: Array,
    },
    occupation:{
        type: String,
    },
    viewedProfile: Number,
    impressions: Number
}, {timestamps: true});

const Users = mongoose.model('user', userSchema);


export default Users;