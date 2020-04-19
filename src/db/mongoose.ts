import mongoose from 'mongoose';

const mongooseDB = (): any => mongoose.connect(`${process.env.MONGODB_URL}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default mongooseDB;
