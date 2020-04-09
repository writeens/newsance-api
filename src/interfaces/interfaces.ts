import { Document, Model } from 'mongoose';
import { Response, Request, NextFunction } from 'express';

// Create interface for IUser
export interface IUser extends Document {
  firstName:string,
  lastName: string,
  email: string,
  password: string,
  categories: string[],
  countries: string[],
  tokens: object[],
  generateAuthToken: () => string
}

// To allow static methods, create model interface
export interface IUserModel extends Model<IUser> {
  findByCredentials: (email:string, password:string) => IUser
}

// Interface for decoded payload from JWT
export interface decodedType {
  _id:string,
  iat:number
}
