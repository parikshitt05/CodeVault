const { body, query, param } = require("express-validator");

const createSnippetValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 100 })
    .withMessage("Title cannot exceed 100 characters"),

  body("code").trim().notEmpty().withMessage("Code content is required"),

  body("language").trim().notEmpty().withMessage("Language is required"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),

  body("tags").optional().isArray().withMessage("Tags must be an array"),

  body("visibility")
    .optional()
    .isIn(["public", "private"])
    .withMessage("Visibility must be either public or private"),
];

const listQueryValidator = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage("limit must be between 1 and 50"),

  query("language")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("language is invalid"),

  query("tag").optional().trim().notEmpty().withMessage("tag is invalid"),

  query("search")
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("search must be 1 to 100 characters"),

  query("sort")
    .optional()
    .isIn(["latest", "oldest"])
    .withMessage("sort must be latest or oldest"),
];

const snippetIdValidator = [
  param("id").isMongoId().withMessage("Invalid snippet id"),
];

const updateSnippetValidator = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ max: 100 })
    .withMessage("Title cannot exceed 100 characters"),

  body("code").optional().trim().notEmpty().withMessage("Code cannot be empty"),

  body("language")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Language cannot be empty"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),

  body("tags").optional().isArray().withMessage("Tags must be an array"),

  body("visibility")
    .optional()
    .isIn(["public", "private"])
    .withMessage("Visibility must be either public or private"),

  body().custom((value) => {
    const allowed = [
      "title",
      "code",
      "language",
      "description",
      "tags",
      "visibility",
    ];
    const hasAtLeastOne = allowed.some((field) =>
      Object.prototype.hasOwnProperty.call(value, field),
    );

    if (!hasAtLeastOne) {
      throw new Error("At least one updatable field is required");
    }

    return true;
  }),
];

const listMySnippetsValidator = [
  ...listQueryValidator,
  query("visibility")
    .optional()
    .isIn(["public", "private"])
    .withMessage("visibility must be public or private"),
];

const listPublicSnippetsValidator = [...listQueryValidator];

module.exports = {
  createSnippetValidator,
  listMySnippetsValidator,
  listPublicSnippetsValidator,
  snippetIdValidator,
  updateSnippetValidator,
};
