const express = require("express");
const {
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
} = require("../controllers/snippetController");
const { protect, optionalProtect } = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validateRequest");
const {
  createSnippetValidator,
  listMySnippetsValidator,
  listPublicSnippetsValidator,
  snippetIdValidator,
  updateSnippetValidator,
} = require("../validators/snippetValidators");

const router = express.Router();

router.post(
  "/",
  protect,
  createSnippetValidator,
  validateRequest,
  createSnippet,
);
router.get(
  "/my",
  protect,
  listMySnippetsValidator,
  validateRequest,
  getMySnippets,
);
router.get(
  "/public",
  listPublicSnippetsValidator,
  validateRequest,
  getPublicSnippets,
);
router.get("/tags", getPopularTags);

router.get("/bookmarks", protect, getBookmarkedSnippets);
router.post(
  "/:id/bookmark",
  protect,
  snippetIdValidator,
  validateRequest,
  bookmarkSnippet,
);
router.delete(
  "/:id/bookmark",
  protect,
  snippetIdValidator,
  validateRequest,
  removeBookmark,
);

router.get(
  "/:id",
  optionalProtect,
  snippetIdValidator,
  validateRequest,
  getSnippetById,
);
router.patch(
  "/:id",
  protect,
  snippetIdValidator,
  updateSnippetValidator,
  validateRequest,
  updateSnippet,
);
router.delete(
  "/:id",
  protect,
  snippetIdValidator,
  validateRequest,
  deleteSnippet,
);


module.exports = router;
