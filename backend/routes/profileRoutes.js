
const express = require("express");
const router = express.Router();

const { getFeed } = require("../controllers/feedController");
const { swipeProfile } = require("../controllers/swipeController");
const { getMatches } = require("../controllers/matchController");

// GET available profiles
router.get("/feed", getFeed);

// POST Like or Pass
router.post("/swipe", swipeProfile);

// GET mutual matches
router.get("/matches", getMatches);

module.exports = router;
