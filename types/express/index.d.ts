import { IUser } from '../../src/interfaces/interfaces';


declare global {
  namespace Express {
    export interface Request {
      token: string;
      user: IUser
    }
  }
}
