import { EventEmitter } from 'stream';
import Twitter = require("twitter");

const client: Twitter = new Twitter({
  access_token_key: `${process.env.TOKEN_KEY}`,
  access_token_secret: `${process.env.TOKEN_SECRET}`,
  consumer_key: `${process.env.CONSUMER_KEY}`,
  consumer_secret: `${process.env.CONSUMER_SECRET}`
});

// Tweeter Args
const params: object = {track: 'twitter'};
const path: string = 'statuses/filter';

// Define Stream
const stream: EventEmitter = client.stream(path, params);

// Function
const parseChunkToObject: any = (data: any) => {
  const element: object = 
    (typeof data) === "object" ? data : {};

  return element;
}

const onReceiveData = (event: Twitter.ResponseData) => {
  // parse to object
  const chunck: any = parseChunkToObject(event);
  const tweetIsDefine: boolean = Object.prototype.hasOwnProperty.call(event, 'user');
  
  if(tweetIsDefine) {
    // When i have get my object
    process.stdout.write(JSON.stringify({
      text: chunck.text,
      username:  chunck.user.name
    }, null, " "));
  }
};

const onError = (error: any) => {
  throw error;
};

// Manage stream

// On success
stream.on('data', onReceiveData);

// On error
stream.on('error', onError);
