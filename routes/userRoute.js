import express from 'express';
import { fetchUsers, createUser, deleteUser, getUser, updateUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/', fetchUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.delete('/:id', deleteUser);
router.patch('/:id', updateUser);

export default router;