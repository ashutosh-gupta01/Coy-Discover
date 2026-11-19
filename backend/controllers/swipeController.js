
const Swipe = require("../models/Swipe");
const Match = require("../models/Match");
const Profile = require("../models/Profile");

const DEMO_USER_ID = "demo-user-1";
const DEMO_USER_OBJECT_ID = "000000000000000000000001";

// POST /api/profiles/swipe
const swipeProfile = async (req, res) => {
  try {
    const { profileId, action } = req.body;

    // Validate request data
    if (!profileId || !["like", "pass"].includes(action)) {
      return res.status(400).json({
        success: false,
        message: "Valid profileId and action (like/pass) are required",
      });
    }

    // Check whether profile exists
    const profile = await Profile.findById(profileId);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    // Prevent duplicate swipes
    const existingSwipe = await Swipe.findOne({
      swiperId: DEMO_USER_ID,
      swipedProfileId: profileId,
    });

    if (existingSwipe) {
      return res.status(409).json({
        success: false,
        message: "You have already swiped this profile",
      });
    }

    // Save user's swipe
    await Swipe.create({
      swiperId: DEMO_USER_ID,
      swipedProfileId: profileId,
      action,
    });

    let isMatch = false;

    // Check mutual like only when current user likes the profile
    if (action === "like") {
      const incomingLike = await Swipe.findOne({
        swiperId: profileId,
        swipedProfileId: DEMO_USER_OBJECT_ID,
        action: "like",
      });

      if (incomingLike) {
        await Match.create({
          user1Id: DEMO_USER_ID,
          user2Id: profileId,
        });

        isMatch = true;
      }
    }

    return res.status(200).json({
      success: true,
      message: isMatch
        ? "It's a match!"
        : action === "like"
        ? "Profile liked successfully"
        : "Profile passed successfully",
      isMatch,
      profile: isMatch ? profile : null,
    });
  } catch (error) {
    console.error("Swipe Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to process swipe",
    });
  }
};

module.exports = { swipeProfile };
