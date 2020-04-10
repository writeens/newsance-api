import express, { Router } from 'express';
// Import Controllers
import {
  getFeed,
  findNews,
  saveNews,
  getSavedNews,
  deleteSavedNews,
} from '../controllers/news';
import auth from '../middleware/auth';


// Setup Router
const router = <Router> express.Router();

// Get News Feed
router.get('/api/v1/news/feed', auth, getFeed);

// Search for News Item
router.get('/api/v1/news/:query', auth, findNews);

// Save News
router.post('/api/v1/news', auth, saveNews);

// Retrieve Saved News
router.get('/api/v1/news', auth, getSavedNews);

// Delete Saved News
router.delete('/api/v1/news/:id', auth, deleteSavedNews);


export default router;
