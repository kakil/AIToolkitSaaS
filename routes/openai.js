const express = require('express');
const { protect } = require('../controllers/auth');
const router = express.Router();

const { summarize } = require('../controllers/openai');

router.route("/summary").post(summarize);


module.exports = router;