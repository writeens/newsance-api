import mongoose from 'mongoose';

const mongooseDB = (): any => mongoose.connect('mongodb://127.0.0.1:27017/newsance-api', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default mongooseDB;
