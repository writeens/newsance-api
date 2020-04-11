/* eslint-disable consistent-return */
import { Request, Response } from 'express';
import { Story } from '../models/story';
import { IStory } from '../interfaces/interfaces';

// Save Story to DB
export const saveStory = async (req:Request, res:Response) => {
  try {
    const story:IStory = new Story(req.body);
    story.author = req.user._id;

    // Save to Database
    await story.save();

    // Send Response
    res.status(201).send({
      id: story.id,
      content: story.content,
      createdAt: story.createdAt,
      author: story.author,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update Story in DB
export const updateStory = async (req:Request, res:Response) => {
  const allowedUpdates = ['content'];
  const updates = Object.keys(req.body);

  // Check that all updates are allowed
  const isAValidOperation:boolean = updates.every((update) => allowedUpdates.includes(update));

  if (!isAValidOperation) {
    res.status(400).send({ error: 'Invalid updates' });
  }

  try {
    // Find the associated story
    const story = await Story.findOne({ _id: req.params.id, author: req.user._id });
    // If Story not found return response
    if (!story) {
      return res.status(404).send({ error: 'Invalid updates' });
    }

    // Update each property in Story model
    updates.forEach((update:string) => { story[update] = req.body[update]; });

    await story.save();

    res.send({
      id: story.id,
      content: story.content,
      createdAt: story.createdAt,
      author: story.author,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete Story and Cascade Delete Comments
export const deleteStory = async (req:Request, res:Response) => {
  const _id = req.params.id;

  try {
    const story = await Story.findOneAndDelete({ _id, author: req.user._id });

    if (!story) {
      res.status(404).send();
    }

    res.send(story);
  } catch (error) {
    res.status(500).send();
  }
};

// Get Stories associated with this account
export const getStories = async (req:Request, res:Response) => {
  try {
    // Populate Virtual
    await req.user.populate('stories').execPopulate();

    if (req.user.stories === []) {
      return res.status(404).send();
    }

    // Send Response
    const result = req.user.stories.map((property:any) => ({
      id: property._id,
      content: property.content,
      createdAt: property.createdAt,
      author: property.author,
    }));

    res.send(result);
  } catch (error) {
    res.status(500).send();
  }
};

// Get a story associated with your account
export const getStory = async (req:Request, res:Response) => {
  const _id = req.params.id;
  try {
    // Find story in collection(DB)
    const story = await Story.findOne({ _id, author: req.user._id });

    // Check if story exists
    if (!story) {
      return res.status(404).send();
    }

    // Send Response to client
    res.send({
      id: story._id,
      content: story.content,
      createdAt: story.createdAt,
      author: story.author,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};


// Get a story feed
export const getStoryFeed = async (req:Request, res:Response) => {
  try {
    const stories = await Story.find({});

    // Check if stories exist in the DB
    if (!stories || stories === []) {
      res.status(404).send();
    }

    const completeStories = stories.map(async (story) => {
      // Populate the comments subsection of the story
      const populatedStory = await story.populate('comments').execPopulate();
      let updatedCommentsArray = [];
      if (populatedStory.comments.length > 0) {
        updatedCommentsArray = populatedStory.comments.map((comment:any) => ({
          id: comment._id,
          comment: comment.comment,
          author: comment.author,
          createdAt: comment.createdAt,
        }));
      }
      return {
        id: populatedStory._id,
        content: populatedStory.content,
        createdAt: populatedStory.createdAt,
        author: populatedStory.author,
        comments: updatedCommentsArray,
      };
    });

    // Await modified stories
    const allStories = await Promise.all(completeStories);
    // console.log(allStories);

    // Send Response
    res.send(allStories);
  } catch (error) {
    res.status(500).send();
  }
};
