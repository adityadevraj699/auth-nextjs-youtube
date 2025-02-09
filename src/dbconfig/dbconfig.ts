import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;
        connection.once('connected' , () => {
            console.log("Database connected successfully!");

        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make MongoDB is running .' +err);
            process.exit();
        })


    } catch (error) {
        console.log("Error connecting to database", error);

    }
}