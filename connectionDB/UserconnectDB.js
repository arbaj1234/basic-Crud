import mongoose from "mongoose";

export const connectDb=async()=>{
try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log(`connect database`);

} catch (error) {
    console.log(error.message);
}
}