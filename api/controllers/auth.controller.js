import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = bcrypt.hashSync(password, 10)
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        })
        res.status(201).json({
            message: "Success"
        })

    } catch (error) {
        next(error);
    }





}
