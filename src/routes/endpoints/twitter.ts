import { text } from "body-parser";
import { EventEmitter } from "stream";
import Twitter = require("twitter");

const client: Twitter = new Twitter({
  access_token_key: `${process.env.TOKEN_KEY}`,
  access_token_secret: `${process.env.TOKEN_SECRET}`,
  consumer_key: `${process.env.CONSUMER_KEY}`,
  consumer_secret: `${process.env.CONSUMER_SECRET}`
});

// Tweeter Args
const params: object = { track: "cyber" };
const path: string = "statuses/filter";

// Define Stream
const stream: EventEmitter = client.stream(path, params);

// For a data return an object

const parseChunkToObject: any = (data: any) => {
  return typeof data === "object" ? data : {};
};

stream.on('data', (event) => {
  const chunck: any = parseChunkToObject(event);
  if('text' in chunck) {
    console.log(chunck.user.name)
    console.log(chunck.text)
  }
});

// Proccess stream on error
const onError: any = (error: any) => {
  throw new Error(error);
};

// On error
stream.on("error", onError);

export { stream, Twitter };
