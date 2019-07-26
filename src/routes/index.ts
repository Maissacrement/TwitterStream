// Externe Import Modules
import express = require("express");
const router: express.Router = express.Router();

// Import Pages
import BadRequest from "./endpoints/badRequest";

router.get("/*", BadRequest);

export default router;