import UserModel from "../models/UserModels.js";

export const createUserController=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        if(!name || !email || !password){
          return  res.status(404).send({
                success: false,
                message: 'please required all fields'
          })
        }
        const user=await UserModel.create({
            name,email,password
        })
        res.status(200).send({
            success: true,
            message: 'created successfully',
            user,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message:'Error creating user',
            error:  error.message
        })
    }
}

export const getUserController=async(req,res)=>{
    try {
      const user=await UserModel.find()
        if(!user){
          return  res.status(404).send({
                success: false,
                message: 'for not found'
          })
        }
        res.status(200).send({
            success: true,
            message: 'getalluser successfully',
            user,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message:'Error getAll api user',
            error:  error.message
        })
    }
}

export const getByidController=async(req,res)=>{
    try {
      const user=await UserModel.findById(req.params.id)
        if(!user){
          return  res.status(404).send({
                success: false,
                message: 'for not found'
          })
        }
        res.status(200).send({
            success: true,
            message: 'getByiduser successfully',
            user,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message:'Error getByid api user',
            error:  error.message
        })
    }
}

export const updateUserController=async(req,res)=>{
    try {
      const user=await UserModel.findByIdAndUpdate(req.params.id)
        if(!user){
          return  res.status(404).send({
                success: false,
                message: 'for not found'
          })
        }
        const {name,email,password}=req.body;
        if(name) user.name=name;
        if(email) user.email=email;
        if(password) user.password=password;

        await user.save()
        res.status(200).send({
            success: true,
            message: 'user update successfully',
            user,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message:'Error update api user',
            error:  error.message
        })
    }
}

export const deleteController=async(req,res)=>{
    try {
      const user=await UserModel.findByIdAndDelete(req.params.id)
        if(!user){
          return  res.status(404).send({
                success: false,
                message: 'for not found'
          })
        }
        res.status(200).send({
            success: true,
            message: 'delete successfully',
            user,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message:'Error delete api user',
            error:  error.message
        })
    }
}