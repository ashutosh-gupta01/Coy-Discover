
const mongoose = require("mongoose");

const swipeSchema = new mongoose.Schema(
  {
    swiperId: {
      type: String,
      required: true,
    },
    swipedProfileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    action: {
      type: String,
      enum: ["like", "pass"],
      required: true,
    },
  },
  { timestamps: true }
);

swipeSchema.index(
  { swiperId: 1, swipedProfileId: 1 },
  { unique: true }
);

module.exports = mongoose.model("Swipe", swipeSchema);
