import express, { Router } from 'express';
// Import Controllers
import auth from '../middleware/auth';
import {
  createUser,
  loginUser,
  logoutUser,
  logoutUserAll,
  updateUserAccount,
  deleteAccount,
} from '../controllers/user';
// Import authentication

// Setup Router
const router = <Router> express.Router();

// Create User
router.post('/api/v1/user/signup', createUser);

// Login User
router.post('/api/v1/user/login', loginUser);

// Logout User
router.post('/api/v1/user/logout', auth, logoutUser);

// Logout User from all sessions
router.post('/api/v1/user/logout/all', auth, logoutUserAll);

// Update User account
router.put('/api/v1/profile/update', auth, updateUserAccount);

// Delete User account
router.delete('/api/v1/profile/delete', auth, deleteAccount);

export default router;
