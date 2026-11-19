
const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    interests: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
