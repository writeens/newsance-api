/* eslint-disable no-use-before-define */
import mongoose, { Schema, HookNextFunction, Document } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';

config();

interface IUser extends Document {
  firstName:string,
  lastName: string,
  email: string,
  password: string,
  categories: string[],
  countries: string[],
  token: string[],
}


// Create Category Schema
const categorySchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    trim: true,
  },
});

// Create Countries Schema
const countrySchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    trim: true,
  },
});

// Create Tokens Schema
const tokenSchema = new Schema({
  name: {
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
  countries: [countrySchema],
  tokens: [tokenSchema],
});

// Setup Method to generate Auth Token

// Setup Statics on Mongoose to Query entire DB (Model)
userSchema.statics.findByCredentials = async function (email:string, password:string) {
  // Check for document with email in DB
  const userData = await User.findOne({ email });
  if (!userData) {
    throw new Error('Unable to Login');
  }

  return userData;
};

// Hash Password on save
userSchema.pre('save', async function (next:HookNextFunction) {
  const user = <IUser> this;
  const hash: string = await bcrypt.hash(user.password, 8);
  user.password = hash;
  console.log('Before Save, Hashing Password...');
  next();
});

// Compile User Schema into a Model
export const User = mongoose.model<IUser>('User', userSchema);
