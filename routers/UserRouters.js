import express from 'express';
import { createUserController, deleteController, getByidController, getUserController, loginUserController, registerUserController, updateUserController } from '../controllers/UserController.js';




const router=express.Router()

// Authentication APIs
router.post("/register", registerUserController);

router.post("/login", loginUserController);

router.post('/createUser',createUserController)

router.get('/getAlluser',getUserController)

router.get('/getByid/:id',getByidController)

router.put('/update/:id',updateUserController)

router.delete('/delete/:id',deleteController)






export default router