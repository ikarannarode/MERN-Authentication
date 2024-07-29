import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';
export const verifyToken = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(errorHandler(401, "You are not authenticated!"));
    }
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) return next(errorHandler(403, "Token is not valid"));
        req.user = user;
        next();

    });
}