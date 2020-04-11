import { Request, Response } from 'express';
import { Comment } from '../models/comment';
import { IComment } from '../interfaces/interfaces';

// Save a Comment to a Story Controller
export const saveCommentOnStory = async (req:Request, res:Response) => {
  try {
    const comment:IComment = new Comment(req.body);
    comment.author = req.user._id;

    await comment.save();

    res.status(201).send(comment);
  } catch (error) {
    res.status(500).send();
  }
};

// Update a Comment to a Story Controller
export const updateCommentOnStory = async (req:Request, res:Response) => {
//   console.log('object');
};

// Delete a Comment to a Story Controller
export const deleteCommentOnStory = async (req:Request, res:Response) => {
//   console.log('object');
};
