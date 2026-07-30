const CaseStudyCategory = require("../models/CaseStudyCategory");

/**
 * Admin forms submit nested objects/arrays as JSON strings inside
 * multipart/form-data (because of the file upload fields). This parses
 * whichever of those fields are present on req.body back into real
 * objects/arrays before they hit Mongoose.
 */
function parseJsonFields(body, fields) {
  fields.forEach((field) => {
    if (typeof body[field] === "string" && body[field].trim() !== "") {
      try {
        body[field] = JSON.parse(body[field]);
      } catch (err) {
        // leave the raw string in place; Mongoose validation will surface it
      }
    }
  });
}

/**
 * Resolves the Industry/Capability document a case study belongs to,
 * from sourceType + parentSlug.
 */
async function resolveParentCategory(sourceType, parentSlug) {
  if (!sourceType || !parentSlug) return null;
  return CaseStudyCategory.findOne({ slug: parentSlug, type: sourceType });
}

module.exports = { parseJsonFields, resolveParentCategory };
