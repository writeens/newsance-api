/* eslint-disable no-use-before-define */
const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;

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
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      const lettersRegex = /[A-Za-z]/;
      const specialCharcterRegex = /\W/;
      const numberRegex = /\d/;
      const hasSpecialCharacter = specialCharcterRegex.test(value);
      const hasNumber = numberRegex.test(value);
      const hasLetters = lettersRegex.test(value);
      if (!hasSpecialCharacter || !hasNumber || !hasLetters) {
        throw new Error('Password is invalid');
      }
    },
  },
  categories: [categorySchema],
  countries: [countrySchema],
  tokens: [tokenSchema],
});

// Setup Method to generate Auth Token

// Setup Statics on Mongoose to Query entire DB (Model)
userSchema.statics.findByCredentials = async function (email, password) {
  // Check for document with email in DB
  const userData = await User.findOne({ email });
  if (!userData) {
    throw new Error('Unable to Login');
  }
};

// Mongoose Hook to has the password before saving
userSchema.pre('save', async (req, res, next) => {
});

// Compile User Schema into a Model
const User = mongoose.model('User', userSchema);

module.exports = User;
