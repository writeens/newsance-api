import express, { Router } from 'express';
// Import Controllers
import { getFeed } from '../controllers/news';
import auth from '../middleware/auth';

// Import authentication

// Setup Router
const router = <Router> express.Router();

// Get News Feed
router.get('/api/v1/news/feed', auth, getFeed);

export default router;
