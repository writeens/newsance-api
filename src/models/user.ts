/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
import mongoose, {
  Schema, HookNextFunction,
} from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { IUser, IUserModel } from '../interfaces/interfaces';

// Allow DotEnv config to use the ENV file
config();

// Create Category Schema
const categorySchema = new Schema({
  category: {
    type: String,
    lowercase: true,
    trim: true,
  },
});

// Create Countries Schema
// const countrySchema = new Schema({
//   name: {
//     type: String,
//     lowercase: true,
//     trim: true,
//   },
// });

// Create Tokens Schema
const tokenSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
});

// Create User Schema
const userSchema = new Schema({
  firstName: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
    unique: true,
    validate(value:string):boolean {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
      return true;
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value:string):boolean {
      const lettersRegex = /[A-Za-z]/;
      const specialCharcterRegex = /\W/;
      const numberRegex = /\d/;
      const hasSpecialCharacter = specialCharcterRegex.test(value);
      const hasNumber = numberRegex.test(value);
      const hasLetters = lettersRegex.test(value);
      if (!hasSpecialCharacter || !hasNumber || !hasLetters) {
        throw new Error('Password is invalid');
      }
      return true;
    },
  },
  categories: [categorySchema],
  country: {
    type: String,
    trim: true,
    lowercase: true,
    default: '',
  },
  tokens: [tokenSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/** Virtual Setup */
// Access all the news by a particular user
userSchema.virtual('news', {
  ref: 'News',
  localField: '_id',
  foreignField: 'owner',
});

/** *
 * Methods on Documents
 * Statics on Models
 */
// Setup Method to generate Auth Token
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  // Generate Token
  const token :string = jwt.sign({ _id: user._id.toString() }, `${process.env.SECRET}`);

  // Update the tokens array
  user.tokens = user.tokens.concat({ token });

  // Save data with the updated token list
  await user.save();

  // return token;
  return token;
};

// Setup Statics on Mongoose to Query entire DB (Model)
userSchema.statics.findByCredentials = async function (email:string, password:string) {
  // Check for document with email in DB
  const userData = await User.findOne({ email });

  if (!userData) {
    console.log('Unable to Login Email');
    throw new Error('Unable to Login');
  }

  const isMatch = await bcrypt.compare(password, userData.password);

  // Check if password in DB matches password provided
  if (!isMatch) {
    console.log('Unable to Login Password');
    throw new Error('Unable to Login');
  }

  return userData;
};

// Hash Password before save
userSchema.pre('save', async function (next:HookNextFunction) {
  const user = <IUser> this;

  // Hash the password only when it is modified
  // Remember that at initialization, the password is at default value
  if (user.isModified('password')) {
    const hash: string = await bcrypt.hash(user.password, 8);
    user.password = hash;
  }
  next();
});

// Compile User Schema into a Model
export const User:IUserModel = mongoose.model<IUser, IUserModel>('User', userSchema);
