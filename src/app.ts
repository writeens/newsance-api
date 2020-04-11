// Require/Imports
import { Express } from 'express';
import compression from 'compression';
import cors from 'cors';

import mongooseDB from './db/mongoose';

import userRoutes from './routes/user';
import newsRoutes from './routes/news';
import storyRoutes from './routes/story';

const express = require('express');

// Call DB
mongooseDB();

// Initialize Server
const app: Express = express();


// Prevent cors issues
app.use(cors());


// compress all responses
app.use(compression());

// Automatically parse incoming requests
app.use(express.json());

// Setup Routes
app.use(userRoutes);
app.use(newsRoutes);
app.use(storyRoutes);

export default app;
