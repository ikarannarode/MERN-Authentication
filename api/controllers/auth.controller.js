import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

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

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email }).select("+password");
        if (!validUser) return next(errorHandler(404, "User not found"));
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, "Invalid login credentials"));
        const token = jwt.sign({ id: validUser._id }, process.env.SECRET_KEY);
        const { password: hashedPassword, ...rest } = validUser._doc;
        res.cookie("token", token, { httpOnly: true, secure: true, expires: new Date(Date.now() + 3600000) }).json({
            rest
        })

    } catch (error) {
        next(error)
    }

}  
