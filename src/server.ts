import app from './app';

// Get port from environment and store in Express
const port = process.env.PORT;


app.listen(port, () => {
  console.log('Server is listening on port', +port);
});
