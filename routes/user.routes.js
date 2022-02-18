import express from 'express';
import { signUp, signIn, logOut } from '../controllers/auth.controller.js';
import { getAllUsers, createUser, findUser, deleteUser, updateUser } from '../controllers/user.controller.js';

const router = express.Router();

router.post("/register", signUp);
router.post("/login", signIn);
router.get("/logout", logOut);


// Routes commençant par /users

router.get('/', getAllUsers);

router.post('/', createUser);

router.get('/:id', findUser);

router.delete('/:id', deleteUser);

router.patch('/:id', updateUser);

export default router;