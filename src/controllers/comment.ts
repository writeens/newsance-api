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
  const _id = req.body.id;
  const allowedUpdates = ['id', 'comment'];
  const updates = Object.keys(req.body);
  const isAValidOperation = updates.every((update) => allowedUpdates.includes(update));

  // Invalid Update on resource
  if (!isAValidOperation) {
    res.status(404).send({ error: 'Invalid updates' });
  }

  try {
    const commentObject = await Comment.findOne({ _id, author: req.user._id });

    if (!commentObject) {
      return res.status(404).send({ error: 'Invalid updates' });
    }

    // Update comment object
    commentObject.comment = req.body.comment;

    await commentObject.save();

    res.send(commentObject);

    // Update Comment
  } catch (error) {
    res.status(500).send();
  }
};

// Delete a Comment to a Story Controller
export const deleteCommentOnStory = async (req:Request, res:Response) => {
//   console.log('object');
};
