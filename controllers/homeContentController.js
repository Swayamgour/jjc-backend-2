const HomeHero = require("../models/home/HomeHero");
const HomeCardSection = require("../models/home/HomeCardSection");

const SECTION_KEYS = HomeCardSection.SECTION_KEYS;

const isValidKey = (key) => SECTION_KEYS.includes(key);

const invalidKeyResponse = (res, key) =>
  res.status(400).json({
    success: false,
    message: `Invalid section key "${key}". Allowed keys: ${SECTION_KEYS.join(", ")}`,
  });

/* ==============================================================
   HERO  (singleton)
================================================================== */

exports.getHero = async (req, res) => {
  try {
    let hero = await HomeHero.findOne();

    if (!hero) {
      hero = await HomeHero.create({});
    }

    res.status(200).json({ success: true, data: hero });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateHero = async (req, res) => {
  try {
    const body = { ...req.body };

    // allow multipart/form-data callers to send arrays as JSON strings
    ["partners", "floatingCards"].forEach((field) => {
      if (body[field] && typeof body[field] === "string") {
        try {
          body[field] = JSON.parse(body[field]);
        } catch (err) {
          throw new Error(`Invalid JSON in ${field}`);
        }
      }
    });

    if (req.file) {
      body.image = {
        url: req.file.path,
        publicId: req.file.filename,
      };
    }

    const hero = await HomeHero.findOneAndUpdate({}, body, {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    });

    res.status(200).json({
      success: true,
      message: "Hero updated successfully",
      data: hero,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/* ==============================================================
   CARD SECTIONS  (one document per sectionKey)
================================================================== */

// GET /api/home-content/sections  -> admin listing of every section
exports.getAllSections = async (req, res) => {
  try {
    const sections = await HomeCardSection.find().sort({ sectionKey: 1 });

    res.status(200).json({
      success: true,
      count: sections.length,
      data: sections,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/home-content/sections/:key
exports.getSection = async (req, res) => {
  try {
    const { key } = req.params;

    if (!isValidKey(key)) return invalidKeyResponse(res, key);

    let section = await HomeCardSection.findOne({ sectionKey: key });

    if (!section) {
      section = await HomeCardSection.create({ sectionKey: key });
    }

    res.status(200).json({ success: true, data: section });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/home-content/sections/:key  -> update header text (tag/title/description/outro/labels)
exports.updateSectionHeader = async (req, res) => {
  try {
    const { key } = req.params;

    if (!isValidKey(key)) return invalidKeyResponse(res, key);

    const body = { ...req.body };

    // items are managed through the dedicated item endpoints below
    delete body.items;
    delete body.sectionKey;

    const section = await HomeCardSection.findOneAndUpdate(
      { sectionKey: key },
      body,
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Section updated successfully",
      data: section,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE /api/home-content/sections/:key -> reset section back to empty defaults
exports.deleteSection = async (req, res) => {
  try {
    const { key } = req.params;

    if (!isValidKey(key)) return invalidKeyResponse(res, key);

    await HomeCardSection.findOneAndDelete({ sectionKey: key });

    res.status(200).json({
      success: true,
      message: "Section reset successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ==============================================================
   SECTION ITEMS  (cards inside a section)
================================================================== */

// POST /api/home-content/sections/:key/items
exports.addSectionItem = async (req, res) => {
  try {
    const { key } = req.params;

    if (!isValidKey(key)) return invalidKeyResponse(res, key);

    let section = await HomeCardSection.findOne({ sectionKey: key });

    if (!section) {
      section = await HomeCardSection.create({ sectionKey: key });
    }

    section.items.push(req.body);
    await section.save();

    res.status(201).json({
      success: true,
      message: "Item added successfully",
      data: section,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// PUT /api/home-content/sections/:key/items/:itemId
exports.updateSectionItem = async (req, res) => {
  try {
    const { key, itemId } = req.params;

    if (!isValidKey(key)) return invalidKeyResponse(res, key);

    const section = await HomeCardSection.findOne({ sectionKey: key });

    if (!section) {
      return res.status(404).json({ success: false, message: "Section not found" });
    }

    const item = section.items.id(itemId);

    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    Object.assign(item, req.body);
    await section.save();

    res.status(200).json({
      success: true,
      message: "Item updated successfully",
      data: section,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE /api/home-content/sections/:key/items/:itemId
exports.deleteSectionItem = async (req, res) => {
  try {
    const { key, itemId } = req.params;

    if (!isValidKey(key)) return invalidKeyResponse(res, key);

    const section = await HomeCardSection.findOne({ sectionKey: key });

    if (!section) {
      return res.status(404).json({ success: false, message: "Section not found" });
    }

    const item = section.items.id(itemId);

    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    item.deleteOne();
    await section.save();

    res.status(200).json({
      success: true,
      message: "Item deleted successfully",
      data: section,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PATCH /api/home-content/sections/:key/items/reorder   body: { order: [itemId, itemId, ...] }
exports.reorderSectionItems = async (req, res) => {
  try {
    const { key } = req.params;
    const { order } = req.body;

    if (!isValidKey(key)) return invalidKeyResponse(res, key);

    if (!Array.isArray(order)) {
      return res.status(400).json({
        success: false,
        message: "'order' must be an array of item ids",
      });
    }

    const section = await HomeCardSection.findOne({ sectionKey: key });

    if (!section) {
      return res.status(404).json({ success: false, message: "Section not found" });
    }

    const itemsById = {};
    section.items.forEach((item) => {
      itemsById[item._id.toString()] = item;
    });

    const reordered = order
      .map((id) => itemsById[id])
      .filter(Boolean);

    // keep any items that were not included in `order` at the end
    section.items.forEach((item) => {
      if (!order.includes(item._id.toString())) {
        reordered.push(item);
      }
    });

    reordered.forEach((item, index) => {
      item.order = index;
    });

    section.items = reordered;
    await section.save();

    res.status(200).json({
      success: true,
      message: "Items reordered successfully",
      data: section,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/home-content/sections/:key/items/:itemId/image
exports.uploadSectionItemImage = async (req, res) => {
  try {
    const { key, itemId } = req.params;

    if (!isValidKey(key)) return invalidKeyResponse(res, key);

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    const section = await HomeCardSection.findOne({ sectionKey: key });

    if (!section) {
      return res.status(404).json({ success: false, message: "Section not found" });
    }

    const item = section.items.id(itemId);

    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    item.image = {
      url: req.file.path,
      publicId: req.file.filename,
    };

    await section.save();

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      data: section,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
