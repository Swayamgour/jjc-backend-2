const CaseStudyCategory = require("../models/CaseStudyCategory");

/**
 * multipart/form-data me nested objects/arrays strings ki tarah aate hain
 * (e.g. body.overview === '{"heading":"..."}'). Ye un fields ko JSON.parse
 * kar deta hai — same pattern jo tumhare Service controller me hai.
 */
function parseJsonFields(body, fields) {
  fields.forEach((field) => {
    if (typeof body[field] === "string") {
      try {
        body[field] = JSON.parse(body[field]);
      } catch (err) {
        // agar valid JSON nahi hai to as-is chhod do, Mongoose validation
        // apna error de dega
      }
    }
  });
}

/**
 * sourceType ("industry" | "capability") + parentSlug se CaseStudyCategory
 * dhoondta hai. Agar future me alag Industry/Capability models use karne
 * ho, sirf isi function ko update karna hoga — baaki controller waisa hi
 * rahega.
 */
async function resolveParentCategory(sourceType, parentSlug) {
  if (!sourceType || !parentSlug) return null;
  return CaseStudyCategory.findOne({ type: sourceType, slug: parentSlug });
}

module.exports = { parseJsonFields, resolveParentCategory };
