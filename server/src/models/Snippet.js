const mongoose = require("mongoose");

const snippetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    code: {
      type: String,
      required: [true, "Code content is required"],
      trim: true,
    },
    language: {
      type: String,
      required: [true, "Language is required"],
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    tags: {
      type: [String],
      default: [],
      set: (tags) =>
        tags.map((tag) => tag.trim().toLowerCase()).filter(Boolean),
    },
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "private",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

snippetSchema.index(
  {
    title: "text",
    description: "text",
    code: "text",
    tags: "text",
  },
  {
    name: "snippet_text_index_v2",
    default_language: "none",
    language_override: "textSearchLanguage",
  },
);


module.exports = mongoose.model("Snippet", snippetSchema);
