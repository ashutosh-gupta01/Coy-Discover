
const Match = require("../models/Match");

// Demo logged-in user
const DEMO_USER_ID = "demo-user-1";

// GET /api/profiles/matches
const getMatches = async (req, res) => {
  try {
    const matches = await Match.find({
      user1Id: DEMO_USER_ID,
    })
      .populate("user2Id", "name age photo bio city profession verified interests")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: matches.length,
      matches,
    });
  } catch (error) {
    console.error("Matches Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch matches",
    });
  }
};

module.exports = { getMatches };
