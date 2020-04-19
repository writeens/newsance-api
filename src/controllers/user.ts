/* eslint-disable consistent-return */
/* eslint-disable max-len */
import { Request, Response } from 'express';
import { User } from '../models/user';


// Signup Controller
export const createUser = async (req :Request, res: Response) => {
  const userName = await User.findOne({ username: req.body.username });

  // Check if username already exists
  if (userName) {
    return res.status(400).send({ error: 'Username has been taken' });
  }

  // Create a new user
  let user = new User(req.body);

  try {
    // Initiate Save
    user = await user.save();

    // Generate token for user just signing up
    const token = await user.generateAuthToken();

    user = await user.toJSON();
    // Return User
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
};

// Login Controller
export const loginUser = async (req :Request, res: Response) => {
  const { username, password } = req.body;
  try {
    // Find the user in DB
    let user = await User.findByCredentials(username, password);

    // If user is found, generate token
    const token = await user.generateAuthToken();

    user = await user.toJSON();

    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ error });
  }
};

// Logout Controller
export const logoutUser = async (req :Request, res: Response) => {
  try {
    const { tokens } = req.user;
    // eslint-disable-next-line max-len
    req.user.tokens = tokens.filter((tokenObject:{token?:string}) => tokenObject.token !== req.token);
    req.user.save();
    res.send({
      message: 'You have successfully logged out',
    });
  } catch (error) {
    res.status(400).send();
  }
};

// Logout From all sessions
export const logoutUserAll = async (req:Request, res:Response) => {
  try {
    req.user.tokens = [];
    req.user.save();
    res.send({
      message: 'You have successfully logged out of all sessions',
    });
  } catch (error) {
    res.status(400).send();
  }
};

// Update User Account
export const updateUserAccount = async (req:Request, res:Response) => {
  try {
    // Get updates from the req.body
    const updates:string[] = Object.keys(req.body);

    // Setup list of allowed Updates
    const allowedUpdates: string[] = ['firstName', 'lastName', 'password', 'email', 'country', 'categories'];

    // Make sure all the items currently in the req.body are allowedUpdates
    const isValidOperation:boolean = updates.every((update:string) => allowedUpdates.includes(update));

    // If an invalid update operation is detected return error message
    if (!isValidOperation) {
      res.status(400).send({
        message: 'Unable to update user',
      });
    }

    // Update the individual properties on the Model instance and save to the DB
    updates.forEach((update:string) => { req.user[update] = req.body[update]; });

    // Save to DB
    await req.user.save();

    const user = await req.user.toJSON();
    // // Send Response
    res.send(user);
  } catch (error) {
    res.status(400).send();
  }
};

// Delete User Account
export const deleteAccount = async (req:Request, res:Response) => {
  try {
    // Remove User from the DB
    req.user.remove();

    res.send({
      message: `${req.user.firstName} ${req.user.lastName} has successfully been deleted`,
    });
  } catch (error) {
    res.status(500).send();
  }
};

// View User Profile
export const viewAccount = async (req:Request, res:Response) => {
  try {
    const user = await req.user.toJSON();
    res.send(user);
  } catch (error) {
    res.send(400).send();
  }
};

// Check Username Validity
export const checkUsername = async (req:Request, res:Response) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });

    // If User exists then username is not available
    if (user) {
      return res.status(404).send({
        error: 'Username exists',
        data: false,
      });
    }

    // Send response
    res.send({
      message: 'Username is available',
      data: true,
    });
  } catch (error) {
    res.status(404).send();
  }
};
