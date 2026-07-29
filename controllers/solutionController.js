const Solution = require("../models/Solution");

// ================= GET ALL SOLUTIONS =================
exports.getAllSolutions = async (req, res) => {
  try {
    const solutions = await Solution.find()
      .populate("platforms", "title slug category")
      .populate("relatedServices", "title slug shortDescription")
      .populate(
        "caseStudies",
        "title slug clientName results featuredImage"
      )
      .sort({ order: 1 });

    res.status(200).json({
      success: true,
      count: solutions.length,
      data: solutions,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= GET SINGLE SOLUTION =================
exports.getSolution = async (req, res) => {
  try {
    const solution = await Solution.findOne({
      slug: req.params.slug,
    })
      .populate("platforms", "title slug category")
      .populate("relatedServices", "title slug shortDescription")
      .populate(
        "caseStudies",
        "title slug clientName results featuredImage"
      );

    if (!solution) {
      return res.status(404).json({
        success: false,
        message: "Solution not found",
      });
    }

    res.status(200).json({
      success: true,
      data: solution,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= CREATE SOLUTION =================
exports.createSolution = async (req, res) => {
  try {
    const solution = await Solution.create(req.body);

    res.status(201).json({
      success: true,
      data: solution,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= UPDATE SOLUTION =================
exports.updateSolution = async (req, res) => {
  try {
    const solution = await Solution.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!solution) {
      return res.status(404).json({
        success: false,
        message: "Solution not found",
      });
    }

    res.status(200).json({
      success: true,
      data: solution,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= DELETE SOLUTION =================
exports.deleteSolution = async (req, res) => {
  try {
    const solution = await Solution.findOneAndDelete({
      slug: req.params.slug,
    });

    if (!solution) {
      return res.status(404).json({
        success: false,
        message: "Solution not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Solution deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= TOGGLE PUBLISH =================
exports.togglePublish = async (req, res) => {
  try {
    const solution = await Solution.findById(req.params.id);

    if (!solution) {
      return res.status(404).json({
        success: false,
        message: "Solution not found",
      });
    }

    solution.isPublished = !solution.isPublished;

    await solution.save();

    res.status(200).json({
      success: true,
      message: solution.isPublished
        ? "Published successfully"
        : "Unpublished successfully",
      data: solution,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= MENU SOLUTIONS =================
exports.getMenuSolutions = async (req, res) => {
  try {
    const solutions = await Solution.find({
      isPublished: true,
    })
      .select("title slug shortDescription")
      .sort({ order: 1 });

    res.status(200).json({
      success: true,
      data: solutions,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};