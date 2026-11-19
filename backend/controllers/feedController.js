
const Profile = require("../models/Profile");
const Swipe = require("../models/Swipe");

// Demo logged-in user
const DEMO_USER_ID = "demo-user-1";

// GET /api/profiles/feed
const getFeed = async (req, res) => {
  try {
    // Find profiles already swiped by the current user
    const swipedProfiles = await Swipe.find({
      swiperId: DEMO_USER_ID,
    }).select("swipedProfileId");

    const swipedIds = swipedProfiles.map((swipe) =>
      swipe.swipedProfileId.toString()
    );

    // Fetch profiles that have not been swiped yet
    const profiles = await Profile.find({
      _id: { $nin: swipedIds },
    }).select("-__v");

    res.status(200).json({
      success: true,
      count: profiles.length,
      profiles,
    });
  } catch (error) {
    console.error("Feed Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch profiles",
    });
  }
};

module.exports = { getFeed };
