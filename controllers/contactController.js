const ContactLead = require("../models/ContactLead");

// POST /api/contact - Submit a lead
exports.submitLead = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      jobTitle,
      leadType,
      serviceArea,
      companySize,
      message,
      sourcePageType,
      sourcePageTitle,
      interestedIn,
      utmSource,
      utmMedium,
      utmCampaign,
    } = req.body;

    // Get IP for spam protection
    const ipAddress =
      req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    const lead = await ContactLead.create({
      firstName,
      lastName,
      email,
      phone,
      company,
      jobTitle,
      leadType: leadType || "general",
      serviceArea,
      companySize,
      message,
      sourcePageType,
      sourcePageTitle,
      interestedIn,
      utmSource,
      utmMedium,
      utmCampaign,
      ipAddress,
    });

    // TODO: Send email notification to admin
    // sendLeadNotificationEmail(lead);

    res.status(201).json({
      success: true,
      message: "Thank you! We'll be in touch within 1 business day.",
      data: { id: lead._id },
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// GET /api/contact/leads - Admin: get all leads
exports.getLeads = async (req, res) => {
  try {
    const { status, page = 1, limit = 20, leadType } = req.query;
    const skip = (page - 1) * limit;

    const query = {};
    if (status) query.status = status;
    if (leadType) query.leadType = leadType;

    const [leads, total] = await Promise.all([
      ContactLead.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      ContactLead.countDocuments(query),
    ]);

    res.json({
      success: true,
      count: leads.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: leads,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/contact/leads/:id
exports.getLead = async (req, res) => {
  try {
    const lead = await ContactLead.findById(req.params.id);
    if (!lead)
      return res
        .status(404)
        .json({ success: false, message: "Lead not found" });
    res.json({ success: true, data: lead });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PATCH /api/contact/leads/:id/status
exports.updateLeadStatus = async (req, res) => {
  try {
    const { status, adminNotes, assignedTo } = req.body;
    const lead = await ContactLead.findByIdAndUpdate(
      req.params.id,
      { status, adminNotes, assignedTo },
      { new: true, runValidators: true }
    );
    if (!lead)
      return res
        .status(404)
        .json({ success: false, message: "Lead not found" });
    res.json({ success: true, data: lead });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// GET /api/contact/stats - Dashboard stats
exports.getLeadStats = async (req, res) => {
  try {
    const stats = await ContactLead.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const totalLeads = await ContactLead.countDocuments();
    const thisMonth = await ContactLead.countDocuments({
      createdAt: { $gte: new Date(new Date().setDate(1)) },
    });

    res.json({
      success: true,
      data: { stats, totalLeads, thisMonth },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
