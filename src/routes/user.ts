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
  viewAccount,
  checkUsername,
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

// Get User account
router.get('/api/v1/profile', auth, viewAccount);

// Get User Name Validity
router.get('/api/v1/username/:username', checkUsername);

export default router;
