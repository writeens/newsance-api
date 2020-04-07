import express, { Request, Response } from 'express';
import {User} from '../models/user';


// Signup Controller
export const createUser = async (req :Request, res: Response) => {
  const user = new User(req.body);
  try {
    // Initiate Save
    await user.save();

    // Return User
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Login Controller
export const loginUser = async (req :Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.schema.statics.findByCredentials(email, password);
    res.send(user);
  } catch (error) {
    res.status(400).send({ error });
  }
};
