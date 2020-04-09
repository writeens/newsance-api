// Require/Imports
import { Express } from 'express';
import compression from 'compression';

import mongooseDB from './db/mongoose';

import userRoutes from './routes/user';

const express = require('express');

// Call DB
mongooseDB();

// Initialize Server
const app: Express = express();


// compress all responses
app.use(compression());

// Automatically parse incoming requests
app.use(express.json());

// Setup Routes
app.use(userRoutes);

export default app;
