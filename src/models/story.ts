import mongoose, { Schema, Model } from 'mongoose';
import { IStory } from '../interfaces/interfaces';

const storySchema = new Schema({
  content: {
    type: String,
    trim: true,
    validate(value:string):boolean {
      if (value.length > 360 || value.length < 0) {
        throw new Error('Content is invalid');
      }
      return true;
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

// Setup Virtual on Story to handle comments
storySchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'story',
});


export const Story:Model<IStory> = mongoose.model<IStory>('Story', storySchema);
