/* eslint-disable max-len */
import { Request, Response } from 'express';
import { User } from '../models/user';


// Signup Controller
export const createUser = async (req :Request, res: Response) => {
  const user = new User(req.body);

  try {
    // Initiate Save
    await user.save();

    // Generate token for user just signing up
    const token = await user.generateAuthToken();

    // Return User
    console.log('User created');
    res.status(201).send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: 'User email already exists' });
  }
};

// Login Controller
export const loginUser = async (req :Request, res: Response) => {
  const { email, password } = req.body;
  try {
    // Find the user in DB
    const user = await User.findByCredentials(email, password);

    // If user is found, generate token
    const token = await user.generateAuthToken();
    console.log('You have successfully logged in');

    res.send({ user, token });
  } catch (error) {
    console.log('Unable to Log In');
    res.status(400).send({ error });
  }
};

// Logout Controller
export const logoutUser = async (req :Request, res: Response) => {
  try {
    const { tokens } = req.user;
    console.log('Inside LogOut controller');
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
    updates.forEach((update:string) => {
      if (update === 'categories') {
        // Empty Array
        req.user[update] = [];
        // Concatenate updated items to the array
        req.body[update].forEach((category:string) => {
          req.user[update] = req.user[update].concat({ category });
        });
      } else {
        req.user[update] = req.body[update];
      }
    });

    // Save to DB
    await req.user.save();

    // // Send Response
    res.send(req.user);
  } catch (error) {
    console.log(error);
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
