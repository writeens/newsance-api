import { Request, Response } from 'express';
import { User } from '../models/user';


// Signup Controller
export const createUser = async (req :Request, res: Response) => {
  const user = new User(req.body);
  try {
    // Initiate Save
    await user.save();

    // Return User
    console.log('User created');
    res.send(user);
  } catch (error) {
    res.status(400).send({ error: 'User email already exists' });
  }
};

// Login Controller
export const loginUser = async (req :Request, res: Response) => {
  const { email, password } = req.body;
  try {
    // Find the user in DB
    const user = await User.schema.statics.findByCredentials(email, password);

    // If user is found, generate token

    res.send(user);
  } catch (error) {
    res.status(400).send({ error });
  }
};
