import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name: {
        type: "string",
        required: [true, 'user name is required']
    },
    email: {
        type: "string",
        required: [true, 'user email is required']
    },
    password: {
        type: "string",
        required: [true, 'user password is required']
    }
})

export const Usermodel = mongoose.model('Usermodel', UserSchema)

export default Usermodel