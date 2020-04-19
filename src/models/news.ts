/* eslint-disable no-underscore-dangle */
import mongoose, {
  Schema,
  Model,
} from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { INews } from '../interfaces/interfaces';

// News Items
const newsSchema = new Schema({
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  content: {
    type: String,
  },
  publishedAt: {
    type: Date,
  },
  imageUrl: {
    type: String,
  },
  newsUrl: {
    type: String,
  },
  newsId: {
    type: String,
    default: uuidv4,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
}, {
  timestamps: true,
});

// Setup method on user schema to remove some items
newsSchema.methods.toJSON = function () {
  const news = this;
  const newsObject = news.toObject();

  delete newsObject.createdAt;
  delete newsObject.owner;
  delete newsObject.__v;

  return newsObject;
};

const News:Model<INews> = mongoose.model<INews>('News', newsSchema);
export default News;
