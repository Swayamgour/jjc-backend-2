const ContactLead = require("../models/ContactLead");

// POST /api/contact - Submit a lead (matches frontend form field names)
exports.submitLead = async (req, res) => {
  try {
    const {
      fname,
      lname,
      email,
      phone,
      company,
      jobTitle,
      leadType,
      serviceArea,
      companySize,
      interestedIn,
      message,
      sourcePageType,
      sourcePageTitle,
      consent,
      // Optional tracking fields (not sent by current frontend form, kept for future use)
      utmSource,
      utmMedium,
      utmCampaign,
    } = req.body;

    // Get IP for spam protection
    const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    const leadData = {
      firstName: fname,
      lastName: lname,
      email: email,
      phone: phone || "",
      company: company,
      jobTitle: jobTitle || "",
      leadType: leadType || "general",
      // Enum fields: only set if a real value was chosen. An empty string
      // is not a valid enum value in the schema, so leaving these keys out
      // entirely when unset avoids a "not a valid enum value" error.
      ...(serviceArea ? { serviceArea } : {}),
      ...(companySize ? { companySize } : {}),
      interestedIn: interestedIn,
      message: message,
      sourcePageType: sourcePageType || "contact",
      sourcePageTitle: sourcePageTitle || "Contact Us",
      consent: consent === true || consent === "on" || consent === "true",
      ipAddress: ipAddress,
      // UTM tracking
      utmSource: utmSource || "",
      utmMedium: utmMedium || "",
      utmCampaign: utmCampaign || "",
    };

    // Validate required fields
    if (!leadData.firstName || !leadData.lastName || !leadData.email ||
      !leadData.company || !leadData.interestedIn || !leadData.message) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields"
      });
    }

    const lead = await ContactLead.create(leadData);

    // TODO: Send email notification to admin
    // sendLeadNotificationEmail(lead);

    res.status(201).json({
      success: true,
      message: "Thank you! We'll be in touch within 1 business day.",
      data: { id: lead._id },
    });

  } catch (err) {
    console.error("Lead submission error:", err);

    // Handle duplicate email or validation errors
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "This email has already been submitted. We'll be in touch soon!"
      });
    }

    // Handle validation errors
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", ")
      });
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later."
    });
  }
};

// GET /api/contact/leads - Admin: get all leads with filters
exports.getLeads = async (req, res) => {
  try {
    const {
      status,
      page = 1,
      limit = 20,
      leadType,
      search,
      startDate,
      endDate
    } = req.query;

    const skip = (page - 1) * limit;
    const query = {};

    // Apply filters
    if (status) query.status = status;
    if (leadType) query.leadType = leadType;

    // Search by name, email, or company
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
      ];
    }

    // Date range filter
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const [leads, total] = await Promise.all([
      ContactLead.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .select('-__v'), // Exclude version field
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
    console.error("Get leads error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch leads"
    });
  }
};

// GET /api/contact/leads/:id - Get single lead
exports.getLead = async (req, res) => {
  try {
    const lead = await ContactLead.findById(req.params.id).select('-__v');

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found"
      });
    }

    res.json({ success: true, data: lead });
  } catch (err) {
    console.error("Get lead error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch lead"
    });
  }
};

// PATCH /api/contact/leads/:id/status - Update lead status
exports.updateLeadStatus = async (req, res) => {
  try {
    const { status, adminNotes, assignedTo } = req.body;

    const lead = await ContactLead.findByIdAndUpdate(
      req.params.id,
      {
        status,
        adminNotes,
        assignedTo,
        ...(status === 'contacted' && { contactedAt: new Date() }),
        ...(status === 'closed' && { closedAt: new Date() }),
      },
      { new: true, runValidators: true }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found"
      });
    }

    res.json({ success: true, data: lead });
  } catch (err) {
    console.error("Update lead error:", err);
    res.status(400).json({
      success: false,
      message: err.message || "Failed to update lead"
    });
  }
};

// GET /api/contact/stats - Dashboard stats with more metrics
exports.getLeadStats = async (req, res) => {
  try {
    // Status distribution
    const statusStats = await ContactLead.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // Lead type distribution
    const leadTypeStats = await ContactLead.aggregate([
      {
        $group: {
          _id: "$leadType",
          count: { $sum: 1 },
        },
      },
    ]);

    // Time-based metrics
    const totalLeads = await ContactLead.countDocuments();

    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const thisMonth = await ContactLead.countDocuments({
      createdAt: { $gte: firstDayOfMonth },
    });

    const lastMonth = await ContactLead.countDocuments({
      createdAt: {
        $gte: new Date(today.getFullYear(), today.getMonth() - 1, 1),
        $lt: firstDayOfMonth,
      },
    });

    // Recent activity (last 7 days)
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentLeads = await ContactLead.countDocuments({
      createdAt: { $gte: sevenDaysAgo },
    });

    res.json({
      success: true,
      data: {
        stats: statusStats,
        leadTypes: leadTypeStats,
        totalLeads,
        thisMonth,
        lastMonth,
        recentLeads,
        growthPercent: lastMonth > 0
          ? Math.round(((thisMonth - lastMonth) / lastMonth) * 100)
          : 0,
      },
    });
  } catch (err) {
    console.error("Get stats error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch stats"
    });
  }
};