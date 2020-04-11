import { Document, Model, Schema } from 'mongoose';

// Create interface for IUser
export interface IUser extends Document {
  firstName:string,
  lastName: string,
  email: string,
  password: string,
  categories: object[],
  country: string,
  tokens: object[],
  // Index Signature for mapping
  [index: string]: any
  // Type checking functions
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

// Interface for INews
export interface INews extends Document{
  author:string,
  title:string,
  content:string,
  publishedAt:Date,
  newsUrl:string,
  imageUrl:string,
  createdAt:Date
  newsId:string,
  owner:Schema.Types.ObjectId,
}

// Interface for IStories
export interface IStory extends Document{
  content:string,
  createdAt:Date,
  author:Schema.Types.ObjectId
  // Index Signature for mapping
  [index: string]: any
}

// Interface for IComments
export interface IComment extends Document{
  story:Schema.Types.ObjectId,
  comment:string,
  author:Schema.Types.ObjectId
  // Index Signature for mapping
  [index: string]: any
}
