const Snippet = require("../models/Snippet");
const Bookmark = require("../models/Bookmark");
const { get } = require("mongoose");


const createSnippet = async (req, res) => {
  try {
    const { title, code, language, description, tags, visibility } = req.body;

    const snippet = await Snippet.create({
      title,
      code,
      language,
      description,
      tags,
      visibility,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Snippet created successfully",
      snippet,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const getMySnippets = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sort = req.query.sort === "oldest" ? 1 : -1;

    const filter = { user: req.user._id };

    if (req.query.visibility) filter.visibility = req.query.visibility;
    if (req.query.language) filter.language = req.query.language.toLowerCase();
    if (req.query.tag) filter.tags = req.query.tag.toLowerCase();
    if (req.query.search) filter.$text = { $search: req.query.search };

    const [total, snippets] = await Promise.all([
      Snippet.countDocuments(filter),
      Snippet.find(filter).sort({ createdAt: sort }).skip(skip).limit(limit),
    ]);

    res.status(200).json({
      success: true,
      snippets,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const getPublicSnippets = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sort = req.query.sort === "oldest" ? 1 : -1;

    const filter = { visibility: "public" };

    if (req.query.language) filter.language = req.query.language.toLowerCase();
    if (req.query.tag) filter.tags = req.query.tag.toLowerCase();
    if (req.query.search) filter.$text = { $search: req.query.search };

    const [total, snippets] = await Promise.all([
      Snippet.countDocuments(filter),
      Snippet.find(filter)
        .sort({ createdAt: sort })
        .skip(skip)
        .limit(limit)
        .populate("user", "username"),
    ]);

    res.status(200).json({
      success: true,
      snippets,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const getSnippetById = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id).populate(
      "user",
      "username",
    );

    if (!snippet) {
      return res.status(404).json({
        success: false,
        message: "Snippet not found",
      });
    }

    const isOwner =
      req.user && req.user._id.toString() === snippet.user._id.toString();

    if (snippet.visibility === "private" && !isOwner) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to view this snippet",
      });
    }

    let isBookmarked = false;

    if (req.user && snippet.visibility === "public" && !isOwner) {
      const bookmark = await Bookmark.exists({
        user: req.user._id,
        snippet: snippet._id,
      });

      isBookmarked = Boolean(bookmark);
    }

    return res.status(200).json({
      success: true,
      snippet,
      isBookmarked,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const updateSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({
        success: false,
        message: "Snippet not found",
      });
    }

    if (snippet.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this snippet",
      });
    }

    const { title, code, language, description, tags, visibility } = req.body;

    if (title !== undefined) snippet.title = title;
    if (code !== undefined) snippet.code = code;
    if (language !== undefined) snippet.language = language;
    if (description !== undefined) snippet.description = description;
    if (tags !== undefined) snippet.tags = tags;
    if (visibility !== undefined) snippet.visibility = visibility;

    const updatedSnippet = await snippet.save();

    return res.status(200).json({
      success: true,
      message: "Snippet updated successfully",
      snippet: updatedSnippet,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const deleteSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({
        success: false,
        message: "Snippet not found",
      });
    }

    if (snippet.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this snippet",
      });
    }

    await snippet.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Snippet deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const getPopularTags = async (req, res) => {
  try {
    const tags = await Snippet.aggregate([
      { $match: { visibility: "public" } },
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },
      { $sort: { count: -1, _id: 1 } },
      { $limit: 20 },
      {
        $project: {
          _id: 0,
          tag: "$_id",
          count: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      tags,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const bookmarkSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({
        success: false,
        message: "Snippet not found",
      });
    }

    if (snippet.visibility !== "public") {
      return res.status(403).json({
        success: false,
        message: "Only public snippets can be bookmarked",
      });
    }

    const bookmark = await Bookmark.findOneAndUpdate(
      { user: req.user._id, snippet: snippet._id },
      { user: req.user._id, snippet: snippet._id },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );

    return res.status(200).json({
      success: true,
      message: "Snippet bookmarked successfully",
      bookmark,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const removeBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOneAndDelete({
      user: req.user._id,
      snippet: req.params.id,
    });

    if (!bookmark) {
      return res.status(404).json({
        success: false,
        message: "Bookmark not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Bookmark removed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const getBookmarkedSnippets = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.user._id })
      .populate({
        path: "snippet",
        populate: {
          path: "user",
          select: "username",
        },
      })
      .sort({ createdAt: -1 });

    const snippets = bookmarks
      .map((bookmark) => bookmark.snippet)
      .filter(Boolean);

    return res.status(200).json({
      success: true,
      snippets,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createSnippet,
  getMySnippets,
  getPublicSnippets,
  getSnippetById,
  updateSnippet,
  deleteSnippet,
  getPopularTags,
  bookmarkSnippet,
  removeBookmark,
  getBookmarkedSnippets,
};
