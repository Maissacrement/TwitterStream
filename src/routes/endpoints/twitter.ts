const Twitter = require("twitter");

var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.TOKEN_KEY,
  access_token_secret: process.env.TOKEN_SECRET
});

// Tweeter Args
const params: object = {track: 'twitter'};
const path: String = 'statuses/filter';

// Define Stream
const stream = client.stream(path, params);

// Manage stream

// On success
stream.on('data', (event: any) => {
    console.log(event && event.text);
});

// On error
stream.on('error', (error: any) => {
    throw error;
});
