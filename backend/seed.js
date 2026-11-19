
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("./config/db");
const Profile = require("./models/Profile");
const Swipe = require("./models/Swipe");
const Match = require("./models/Match");

const profiles = require("./data/profiles");

const DEMO_USER_ID = "demo-user-1";
const DEMO_USER_OBJECT_ID = new mongoose.Types.ObjectId(
  "000000000000000000000001"
);

const seedProfiles = async () => {
  try {
    await connectDB();

    // Clear existing demo data before seeding
    await Promise.all([
      Profile.deleteMany({}),
      Swipe.deleteMany({}),
      Match.deleteMany({}),
    ]);

    // Convert frontend profile fields into database fields
    const profileData = profiles.map((profile) => ({
      name: profile.name,
      age: profile.age,
      photo: profile.image,
      bio: profile.bio,
      city: profile.location,
      profession: profile.profession,
      verified: profile.verified,
      interests: profile.interests,
    }));

    const insertedProfiles = await Profile.insertMany(profileData);

    // Store demo incoming likes privately
    const incomingLikes = profiles
      .map((profile, index) => {
        if (!profile.likedYou) return null;

        return {
          swiperId: insertedProfiles[index]._id.toString(),
          swipedProfileId: DEMO_USER_OBJECT_ID,
          action: "like",
        };
      })
      .filter(Boolean);

    if (incomingLikes.length > 0) {
      await Swipe.insertMany(incomingLikes);
    }

    console.log(`${insertedProfiles.length} profiles inserted`);
    console.log(`${incomingLikes.length} incoming likes created`);
    console.log("Database seeding completed!");

    process.exit(0);
  } catch (error) {
    console.error("Seeding Error:", error.message);
    process.exit(1);
  }
};

seedProfiles();
