import mongoose from "mongoose";

export default async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/roleSystem')
        console.log('MongoDB is connected');

    } catch (error) {
        console.log(error.message);


    }
}