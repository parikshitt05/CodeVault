const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    snippet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Snippet",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

bookmarkSchema.index({ user: 1, snippet: 1 }, { unique: true });

module.exports = mongoose.model("Bookmark", bookmarkSchema);
