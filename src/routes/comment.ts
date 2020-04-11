import express, { Router } from 'express';
import auth from '../middleware/auth';
import { saveCommentOnStory } from '../controllers/comment';

const router:Router = express.Router();

// Save a Comment
router.post('/api/v1/stories/comment', auth, saveCommentOnStory);

export default router;
