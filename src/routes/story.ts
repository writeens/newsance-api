import express, { Router } from 'express';
import {
  saveStory,
  updateStory,
  deleteStory,
  getStories,
  getStory,
  getStoryFeed,
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

// Get all Droplets/Stories by this user
router.get('/api/v1/stories', auth, getStories);

// Get a particular Droplet
router.get('/api/v1/stories/:id', auth, getStory);

// Get stories feed
router.get('/api/v1/feed/stories', auth, getStoryFeed);

export default router;
