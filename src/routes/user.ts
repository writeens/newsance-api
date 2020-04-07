import express, { Router } from 'express';
// Import Controllers
import { createUser, loginUser } from '../controllers/user';

// Setup Router
const router = express.Router();

// Create Users
router.post('/api/v1/users/signup', createUser);

// Login Users
router.post('/api/v1/users/login', loginUser);

export default router;
