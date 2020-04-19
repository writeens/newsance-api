// Require/Imports
import { Express } from 'express';
import compression from 'compression';
import cors from 'cors';

import mongooseDB from './db/mongoose';

import userRoutes from './routes/user';
import newsRoutes from './routes/news';
import storyRoutes from './routes/story';
import commentRoutes from './routes/comment';

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

app.use((req, res, next) => {
  console.log(`${req.method}`, `${req.path}`);
  next();
});

app.use((req, res, next) => {
  console.log('Entering your application');
  next();
});

// Setup Routes
app.use(userRoutes);
app.use(newsRoutes);
app.use(storyRoutes);
app.use(commentRoutes);

export default app;
