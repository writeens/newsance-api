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
