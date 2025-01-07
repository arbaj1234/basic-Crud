import UserModel from "../models/UserModels.js";
import bcrypt from "bcrypt";



export const registerUserController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check for required fields
        if (!name || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "All fields are required",
            });
        }

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: "User already exists",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await UserModel.create({
            name,
            email,
            password
        });

        res.status(201).send({
            success: true,
            message: "User registered successfully",
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error registering user",
            error: error.message,
        });
    }
};

export const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "All fields are required",
            });
        }

        // Find user
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }
        console.log("Input Password:", password);
        console.log("Stored Hashed Password:", user.password);
        // Compare password
        const isMatch = await user.comparePassword(password);
        console.log("Password Match:", isMatch);
        if (!isMatch) {
            return res.status(400).send({
                success: false,
                message: "Invalid credentials",
            });
        }

        // Generate JWT token
        const token = user.generateToken();
        res.status(200).send({
            success: true,
            message: "Login successful",
            token,
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error logging in",
            error: error.message,
        });
    }
};

export const createUserController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(404).send({
                success: false,
                message: 'please required all fields'
            })
        }
        const user = await UserModel.create({
            name, email, password
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
            message: 'Error creating user',
            error: error.message
        })
    }
}

export const getUserController = async (req, res) => {
    try {
        const user = await UserModel.find()
        if (!user) {
            return res.status(404).send({
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
            message: 'Error getAll api user',
            error: error.message
        })
    }
}

export const getByidController = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id)
        if (!user) {
            return res.status(404).send({
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
            message: 'Error getByid api user',
            error: error.message
        })
    }
}

export const updateUserController = async (req, res) => {
    try {
        const user = await UserModel.findByIdAndUpdate(req.params.id)
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'for not found'
            })
        }
        const { name, email, password } = req.body;
        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = password;

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
            message: 'Error update api user',
            error: error.message
        })
    }
}

export const deleteController = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'for not found'
            })
        };
        // Mark the user as deleted
        user.isDelate = true;
        await user.save();
        res.status(200).send({
            success: true,
            message: 'delete successfully',
            user,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error delete api user',
            error: error.message
        })
    }
}