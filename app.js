// Require/Imports
const express = require('express');
require('./src/db/mongoose');
const compression = require('compression');


const userRoutes = require('./src/routes/user');
const User = require('./src/models/user');
// Initialize Server
const app = express();
const port = process.env.PORT || 3000;

// compress all responses
app.use(compression());

// Automatically parse incoming requests
app.use(express.json());

// Setup Routes
app.use(userRoutes);

app.listen(port, () => {
  console.log('Server is listening on port', +port);
});


// Testing Environment
const body = {
  email: 'jennynow@gmail.com',
  password: 'RED1234@1',
};
const myFunc = async ({ email, password }) => {
//   const data = await User.findOne({ email });
//   if (!data) {
//     return console.log('Email does not exist, throw error');
//   }

//   console.log('compare Passwords');
};

myFunc(body);
