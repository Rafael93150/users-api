import express from 'express';
import { signUp, signIn, logOut } from '../controllers/auth.controller.js';
import { getAllUsers, createUser, findUser, deleteUser, updateUser, addContact, deleteContact, acceptRequest, rejectRequest, cancelRequest } from '../controllers/user.controller.js';
import { uploadProfil } from '../controllers/upload.controller.js';
import multer from 'multer';    // libarairie d'upload d'images

const upload = multer();
const router = express.Router();

// authentifiation
router.post("/register", signUp);
router.post("/login", signIn);
router.get("/logout", logOut);

// users
router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:id', findUser);
router.delete('/:id', deleteUser);
router.patch('/:id', updateUser);
router.patch('/add/:id', addContact);
router.patch('/delete/:id', deleteContact);
router.patch('/accept/:id', acceptRequest);
router.patch('/reject/:id', rejectRequest);
router.patch('/cancel/:id', cancelRequest);

// upload
router.post('/upload', upload.single("file"), uploadProfil)

export default router;