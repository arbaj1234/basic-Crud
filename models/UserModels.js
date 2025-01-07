import mongoose from "mongoose";
import bcrypt from "bcrypt";
import JWT from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
    name: {
        type: "string",
        required: [true, 'user name is required']
    },
    email: {
        type: "string",
        required: [true, 'user email is required'],
        unique : [true, "email is taken"],
    },
    password: {
        type: "string",
        required: [true, 'user password is required']
    }
},{timestamps: true});

UserSchema.pre("save",async function(next){
    if(!this.isModified('password'))return next();
    this.password=await bcrypt.hash(this.password,10)
})

// campare function
UserSchema.methods.comparePassword = async function( plainPassword){
    return await bcrypt.compare(plainPassword,this.password);
};

// JWT TOKEN
UserSchema.methods.generateToken=function(){
    return JWT.sign({ _id:this._id},process.env.JWT_SECRET,{expiresIn:'7d'})
}

export const Usermodel = mongoose.model('Usermodel', UserSchema)

export default Usermodel