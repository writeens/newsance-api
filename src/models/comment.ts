import mongoose, { Schema, Model } from 'mongoose';
import { IComment } from '../interfaces/interfaces';

const commentSchema = new Schema({
  story: {
    type: Schema.Types.ObjectId,
  },
  comment: {
    type: String,
    trim: true,
    validate(value:string):boolean {
      if (value.length < 0 || value.length > 360) {
        throw new Error('Comment is invalid');
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
    ref: 'User',
    required: true,
  },
});

commentSchema.virtual('authorDetails', {
  ref: 'User',
  localField: 'author',
  foreignField: '_id',
  justOne: true,
});

export const Comment:Model<IComment> = mongoose.model<IComment>('Comment', commentSchema);
