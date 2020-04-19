/* eslint-disable consistent-return */
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
  // Get ID of the story this comment belongs to
  const _id = req.body.id;
  const allowedUpdates = ['id', 'comment'];
  const updates = Object.keys(req.body);
  const isAValidOperation = updates.every((update) => allowedUpdates.includes(update));

  // Invalid Update on Comment
  if (!isAValidOperation) {
    return res.status(404).send({ error: 'Invalid updates' });
  }

  try {
    const commentObject = await Comment.findOne({ _id, author: req.user._id });

    if (!commentObject) {
      return res.status(404).send({ error: 'Invalid updates' });
    }

    // Update comment object
    commentObject.comment = req.body.comment;

    // Save update
    await commentObject.save();

    // Send to client
    res.send(commentObject);

    // Update Comment
  } catch (error) {
    res.status(500).send();
  }
};

// Delete a Comment to a Story Controller
export const deleteCommentOnStory = async (req:Request, res:Response) => {
  try {
    const comment = await Comment.findOneAndDelete({ _id: req.body.commentid, author: req.user._id });

    if (!comment) {
      return res.status(404).send({ error: 'Unable to delete comment' });
    }

    // Send Response back to client
    res.send(comment);
  } catch (error) {
    res.status(500).send();
  }
};

// Get comments on a story
export const getCommentsOnStory = async (req:Request, res:Response) => {
  try {
    const comments = await Comment.find({ story: req.params.storyid });

    if (!comments || comments === []) {
      return res.status(404).send();
    }

    const updatedComments: object[] = comments.map(async (comment) => {
      const newComments = await comment.populate('authorDetails').execPopulate();
      return {
        commentid: newComments._id,
        comment: newComments.comment,
        storyid: newComments.story,
        author: `${newComments.authorDetails.username}`,
      };
    });

    const completeComments = await Promise.all(updatedComments);

    // Send Response to client
    res.send(completeComments);
  } catch (e) {
    res.status(500).send();
  }
};
