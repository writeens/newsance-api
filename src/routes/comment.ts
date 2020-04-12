import express, { Router } from 'express';
import auth from '../middleware/auth';
import {
  saveCommentOnStory,
  updateCommentOnStory,
  deleteCommentOnStory,
  getCommentsOnStory,
} from '../controllers/comment';

const router:Router = express.Router();

// Save a comment
router.post('/api/v1/comment', auth, saveCommentOnStory);

// Update a comment
router.put('/api/v1/comment', auth, updateCommentOnStory);

// Delete a comment
router.delete('/api/v1/comment', auth, deleteCommentOnStory);

// Get comments on a story
router.get('/api/v1/comments/:storyid', auth, getCommentsOnStory);

export default router;
