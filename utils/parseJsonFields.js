const parseJsonFields = (body, fields) => {
  fields.forEach((field) => {
    if (body[field] && typeof body[field] === "string") {
      try {
        body[field] = JSON.parse(body[field]);
      } catch (err) {
        throw new Error(`Invalid JSON in ${field}`);
      }
    }
  });
};

module.exports = parseJsonFields;