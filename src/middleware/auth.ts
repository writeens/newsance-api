/* eslint-disable no-underscore-dangle */
import jwt from 'jsonwebtoken';
import { Response, NextFunction, Request } from 'express';
import { User } from '../models/user';
import { decodedType } from '../interfaces/interfaces';


const auth = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const token:string = `${req.headers.authorization?.replace('Bearer ', '')}`;
    const decoded = <decodedType> jwt.verify(token, `${process.env.JWT_SECRET}`);
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    // Check if user exists
    if (!user) {
      throw new Error();
    }


    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: 'Unable to Authenticate' });
  }
};

export default auth;
