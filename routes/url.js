const express = require("express");
const { handleGenrateShortUrl, handleGetAnalytics, handleGetUrlAnalytics } = require("../controllers/url")
const router = express.Router();

router.post('/',handleGenrateShortUrl);
router.get('/analytics',handleGetAnalytics);
router.get('/analyze/:id',handleGetUrlAnalytics);

module.exports = router;