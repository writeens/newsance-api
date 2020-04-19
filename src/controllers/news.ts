/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import News from '../models/news';

const axios = require('axios').default;

// Get News Feed
export const getFeed = async (req :Request, res:Response) => {
  const { categories } = req.user;
  let allPromises = [];

  // Function to get feed from api based on criteria
  const getCategoryFeed = async (category:string, country:string, page:number) => axios.get(`${process.env.BASE_NEWS_API_URL}/top-headlines?country=${country}&category=${category}&pageSize=4&page=${page}`, {
    headers: { Authorization: `Bearer ${process.env.NEWS_API_KEY}` },
    withCredentials: true,
  });

  try {
    // Create an array of promises which can be passed into axios
    allPromises = categories.map((category:any) => getCategoryFeed(category.category, req.user.country, req.body.page));
    const results = await axios.all(allPromises);
    let feed:object[] = [];
    results.forEach((result:any):void => {
      feed.push(...result.data.articles);
    });

    // Get all the news articles by this user
    feed = feed.map((result:any):object => ({
      author: result.author,
      title: result.title,
      content: `${result.content}`.slice(0, 260),
      publishedAt: result.publishedAt,
      newsUrl: result.url,
      imageUrl: result.urlToImage,
    }));

    // Send Response
    res.send({ data: feed });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

// Search for News
export const findNews = async (req: Request, res:Response) => {
  const query = encodeURI(req.params.query);
  try {
    const results = await axios.get(`${process.env.BASE_NEWS_API_URL}/everything?q=${query}`, {
      headers: { Authorization: `Bearer ${process.env.NEWS_API_KEY}` },
      withCredentials: true,
    });

    const search = results.data.articles.map((result: any):object => ({
      author: result.author,
      title: result.title,
      content: `${result.content}`.slice(0, 260),
      publishedAt: result.publishedAt,
      newsUrl: result.url,
      imageUrl: result.urlToImage,
    }));

    res.send({ data: search });
  } catch (error) {
    res.status(500).send();
  }
};

// Save News to DB
export const saveNews = async (req: Request, res:Response) => {
  const news = new News(req.body);
  news.owner = req.user._id;
  try {
    // Save to the DB
    news.save();

    res.status(201).send(news);
  } catch (error) {
    res.status(500).send();
  }
};

// Get Saved News
export const getSavedNews = async (req:Request, res:Response) => {
  try {
    // Find all the news items associated with a particular user
    const allNews = await News.find({ owner: req.user._id });

    res.send(allNews);
  } catch (error) {
    res.status(500).send();
  }
};

// Delete Saved News
// eslint-disable-next-line consistent-return
export const deleteSavedNews = async (req:Request, res:Response) => {
  try {
    const convertedId = mongoose.Types.ObjectId(`${req.params.id}`);
    const newsItem = await News.findOneAndDelete({ owner: req.user._id, _id: convertedId });

    // If item isnt present
    if (!newsItem) {
      return res.status(404).send({
        message: 'Delete operation unsuccessful',
      });
    }

    res.send({
      message: 'Delete operation successful',
      data: newsItem,
    });
  } catch (error) {
    res.status(500).send();
  }
};
