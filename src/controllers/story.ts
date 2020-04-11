import mongoose, { Request, Response } from 'express';
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
// eslint-disable-next-line consistent-return
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

// Get Story/Droplet
export const getStory = async (req:Request, res:Response) => {

};
