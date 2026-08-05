const User = require("../models/User");

// POST /api/auth/register (admin only - no public signup)
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await User.create({ name, email, password, role });
    const token = user.getSignedToken();

    res.status(201).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }
    res.status(400).json({ success: false, message: err.message });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password required" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !user.isActive) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    const token = user.getSignedToken();

    res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/auth/me
exports.getMe = async (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      lastLogin: req.user.lastLogin,
    },
  });
};

// PUT /api/auth/me

exports.updateMe = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Email update
    if (email) {
      user.email = email;
    }

    // Password update
    if (oldPassword && newPassword) {
      const isMatch = await user.matchPassword(oldPassword);

      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Old password is incorrect",
        });
      }

      user.password = newPassword;
    }

    await user.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
