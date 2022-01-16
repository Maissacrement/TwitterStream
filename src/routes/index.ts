// Externe Import Modules
import express = require("express");
const router: express.Router = express.Router();

// Import Pages
import BadRequest from "./endpoints/badRequest";
// import "./endpoints/twitter.ts";
// import getTweet from './endpoints/twitterApi';
import { getTweet } from './endpoints/twitterApi'


router.get('/tweet', getTweet)

router.get("/*", BadRequest);

export default router;
