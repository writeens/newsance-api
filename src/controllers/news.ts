import { Request, Response } from 'express';

const axios = require('axios').default;

export const getFeed = async (req :Request, res:Response) => {
//   const { country } = req.user;
  const { categories } = req.user;
  let allPromises = [];

  const getCategoryFeed = async (category:string, country:string) => axios.get(`${process.env.BASE_API_URL}/top-headlines?country=${country}&category=${category}`, {
    headers: { Authorization: `Bearer ${process.env.NEWS_API_KEY}` },
    withCredentials: true,
  });

  allPromises = categories.map((category:any) => getCategoryFeed(category.category, req.user.country));
  try {
    // Create Query Parameters
    const results = await axios.all(allPromises);
    const feed:object[] = [];
    results.forEach((result:any):void => {
      feed.push(...result.data.articles);
    });
    res.send({
      message: feed,
    });
    // console.log(data);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};
