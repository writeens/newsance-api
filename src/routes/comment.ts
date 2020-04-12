import express, { Router } from 'express';
import auth from '../middleware/auth';
import { saveCommentOnStory, updateCommentOnStory } from '../controllers/comment';

const router:Router = express.Router();

// Save a comment
router.post('/api/v1/comment', auth, saveCommentOnStory);

// Update a comment
router.put('/api/v1/comment', auth, updateCommentOnStory);

export default router;
