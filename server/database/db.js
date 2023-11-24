import mongoose from 'mongoose';


export const connectDB = async () => {
    try {
        const connectt = await mongoose.connect(process.env.MONGODB_URL);
        if(connectt){
            console.log("connected to database successfully")
        }
    } catch (error) {
        console.log(error)
    }
}

