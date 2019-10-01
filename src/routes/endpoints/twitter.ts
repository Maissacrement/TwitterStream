import { EventEmitter } from "stream";
import Twitter = require("twitter");

const client: Twitter = new Twitter({
  access_token_key: `${process.env.TOKEN_KEY}`,
  access_token_secret: `${process.env.TOKEN_SECRET}`,
  consumer_key: `${process.env.CONSUMER_KEY}`,
  consumer_secret: `${process.env.CONSUMER_SECRET}`
});

// Tweeter Args
const params: object = { track: "rihanna" };
const path: string = "statuses/filter";

// Define Stream
const stream: EventEmitter = client.stream(path, params);

// For a data return an object
const parseChunkToObject: any = (data: any) => {
  const element: object = typeof data === "object" ? data : {};

  return element;
};

// Process stream on success
const onReceiveData: any = (event: Twitter.ResponseData) => {
  // Get for each chunck a data object --> resolve chunck == 'undefined'
  const chunck: any = parseChunkToObject(event);
  const tweetIsDefine: boolean = Object.prototype.hasOwnProperty.call(
    event,
    "user"
  );

  if (tweetIsDefine) {
    // Here i can work on my object
    process.stdout.write(
      JSON.stringify(
        {
          text: chunck.text,
          username: chunck.user.name
        },
        null,
        " "
      )
    );
  }
};

// Proccess stream on error
const onError: any = (error: any) => {
  throw error;
};

// Manage stream

// On success
stream.on("data", onReceiveData);

// On error
stream.on("error", onError);
