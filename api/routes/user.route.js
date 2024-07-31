import express from 'express';
import { getUser, updateUser } from '../controllers/user.controller.js';

const router = express.Router();

router.get("/", getUser);
router.post(`/update/:id`, updateUser);

export default router;