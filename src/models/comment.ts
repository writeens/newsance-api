import mongoose, { Schema, Model } from 'mongoose';
import { IComment } from '../interfaces/interfaces';

const commentSchema = new Schema({
  story: {
    type: Schema.Types.ObjectId,
    ref: 'Story',
    required: true,
  },
  comment: {
    type: String,
    trim: true,
    validate(value:string):boolean {
      if (value.length > 360) {
        throw new Error('Comment is too long');
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
  },
});

export const Comment:Model<IComment> = mongoose.model<IComment>('Comment', commentSchema);
