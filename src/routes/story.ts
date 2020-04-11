import express, { Router } from 'express';
import {
  saveStory,
  updateStory,
  deleteStory,
  getStories,
  getStory,
} from '../controllers/story';
import auth from '../middleware/auth';

// Setup Router
const router:Router = express.Router();

// Save a Droplet/Story
router.post('/api/v1/stories', auth, saveStory);

// Update a Droplet/Story
router.put('/api/v1/stories/:id', auth, updateStory);

// Delete a Droplet/Story
router.delete('/api/v1/stories/:id', auth, deleteStory);

// Get all Droplets/Stories
router.get('/api/v1/stories', auth, getStories);

// Get a particular Droplet
router.get('/api/v1/stories/:id', auth, getStory);

export default router;
