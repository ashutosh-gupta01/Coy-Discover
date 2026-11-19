
const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(
  {
    user1Id: {
      type: String,
      required: true,
    },
    user2Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
  },
  { timestamps: true }
);

matchSchema.index(
  { user1Id: 1, user2Id: 1 },
  { unique: true }
);

module.exports = mongoose.model("Match", matchSchema);
