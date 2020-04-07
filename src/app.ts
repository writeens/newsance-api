// Require/Imports
import express, { Application } from 'express';
import compression from 'compression';

import mongooseDB from './db/mongoose';

import userRoutes from './routes/user';

// Call DB
mongooseDB();

// Initialize Server
const app: Application = express();


// compress all responses
app.use(compression());

// Automatically parse incoming requests
app.use(express.json());

// Setup Routes
app.use(userRoutes);

// Testing Environment
const body = {
  email: 'jennynow@gmail.com',
  password: 'RED1234@1',
};
const myFunc = async ({ email, password }: {email: string; password: string}) => {
  //   const data = await User.findOne({ email });
  //   if (!data) {
  //     return console.log('Email does not exist, throw error');
  //   }

  //   console.log('compare Passwords');
};

myFunc(body);

export default app;
