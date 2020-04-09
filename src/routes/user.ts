import express, { Router } from 'express';
// Import Controllers
import auth from '../middleware/auth';
import {
  createUser, loginUser, logoutUser, logoutUserAll,
} from '../controllers/user';
// Import authentication

// Setup Router
const router = <Router> express.Router();

// Create User
router.post('/api/v1/users/signup', createUser);

// Login User
router.post('/api/v1/users/login', loginUser);

// Logout User
router.post('/api/v1/users/logout', auth, logoutUser);

// Logout User from all sessions
router.post('/api/v1/users/logout/all', auth, logoutUserAll);

export default router;
