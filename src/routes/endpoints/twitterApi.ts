
// import { stream, Twitter } from "./twitter";
import { EventEmitter } from "stream";
// import * as fs from 'fs';
import Twitter = require("twitter");
// import express = require("express");
// const router: express.Router = express.Router();
// const json2csv = require('json2csv');

const client: Twitter = new Twitter({
  access_token_key: `${process.env.TOKEN_KEY}`,
  access_token_secret: `${process.env.TOKEN_SECRET}`,
  consumer_key: `${process.env.CONSUMER_KEY}`,
  consumer_secret: `${process.env.CONSUMER_SECRET}`
});

// Tweeter Args
// const params: object = { track: "akon" };
const path: string = "statuses/filter";

// Define Stream
const stream: (params: { track: string }) => EventEmitter = (params: { track: string }) => client.stream(path, params);

// Proccess stream on error
/*const onError: any = (error: any) => {
  throw new Error(error);
};
stream.on("error", onError);*/


/*
export { stream, Twitter };

const parseChunkToObject: any = (data: any) => {
  const element: object = typeof data === "object" ? data : {};

  return element;
};
// Process stream on success

stream.on('data', (event: Twitter.ResponseData) => {
  // Get for each chunck a data object --> resolve chunck == 'undefined'
  const chunck: any = parseChunkToObject(event);
  const tweetIsDefine: boolean = Object.prototype.hasOwnProperty.call(event,"user");
  if (tweetIsDefine) {
    console.log(JSON.stringify(chunck, null, 2))
    res.write({
      text: chunck.text,
      username: chunck.user.name
    })
    // Here i can work on my object
    res.end()
  }
})*/

const parseChunkToObject: any = (data: any) => {
  const element: object = typeof data === "object" ? data : {};

  return element;
};

const getTweet = (req: any, res: any) => {
  const searchBroker = stream({ track: req.query.search })
  let i = 0;
  searchBroker.on('data', (event: Twitter.ResponseData) => {
    const chunck: any = parseChunkToObject(event);
    const tweetIsDefine: boolean = Object.prototype.hasOwnProperty.call(event,"user");
    if (tweetIsDefine) {
      res.write(JSON.stringify({ text: chunck.text, username: chunck.user.name }, null, 2) + "\n")
      i++
    }
    //if (i>3) res.end()

  })

  searchBroker.on('error', (err) => console.log(err))
};

export { getTweet };
