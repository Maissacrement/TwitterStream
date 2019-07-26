// lib/app.ts
import bodyParser = require("body-parser");
import cors = require("cors");
import express = require("express");
import session = require("express-session");

// Create a new express application instance
const app: express.Application = express();

// Process .env is defined ?
if (
  !process.env.PORT ||
  !process.env.SECRET_SESSION
) {
  process.stdout.write(JSON.stringify(process.env));
  throw new Error("please verify you .env or .env-sample file");
}

// Constants
const PORT = process.env.PORT;

// My controller
import routes from "./routes/index";

// Implement CORS
app.use(cors());

// Session
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SECRET_SESSION
  })
);

// Function

// Cors config
const header = (
  _: express.Request,
  res: express.Response, 
  next: express.NextFunction
) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
};

const listen = () => {
  process.stdout.write(`Listening on port ${PORT}!\n`);
};

// SET HEADER
app.use(header);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Path connection
app.use(routes);

app.listen(PORT, listen);
