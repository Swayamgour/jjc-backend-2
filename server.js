const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const connectDB = require("./config/db");

// Routes
const categoryRoutes = require("./routes/categoryRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const platformRoutes = require("./routes/platformRoutes");
const industryRoutes = require("./routes/industryRoutes");
const solutionRoutes = require("./routes/solutionRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const caseStudyRoutes = require("./routes/caseStudyRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const faqRoutes = require("./routes/faqRoutes");
const contactRoutes = require("./routes/contactRoutes");
const authRoutes = require("./routes/authRoutes");
const seoRoutes = require("./routes/seoRoutes");
const navRoutes = require("./routes/navRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const homeRoutes = require("./routes/homeRoutes");
const homeContentRoutes = require("./routes/homeContentRoutes");
const blogCategoryRoutes = require("./routes/blogCategoryRoutes");
const blogRoutes = require("./routes/blogRoutes");
const caseStudyCategory = require("./routes/caseStudyCategoryRoutes");
const caseStudy = require("./routes/caseStudyRoutes");
const pages = require("./routes/pageRoutes");
const homePageRoutes = require("./routes/homePageRoutes");
const caseStudyStoryRoutes = require("./routes/caseStudyStoryRoutes");
const checklistRoutes = require("./routes/checklistRoutes");
const guideRoutes = require("./routes/guideRoutes");
const whitepaperRoutes = require("./routes/whitepaperRoutes");




// Connect to DB
connectDB();

const app = express();

// Security
app.use(helmet());

app.use(
  cors({
    origin: "*",
    credentials: false,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
});
app.use("/api/", limiter);

// Stricter for contact form
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: "Too many contact requests, please try again later.",
});

// Body parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Logger (dev only)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/platforms", platformRoutes);
app.use("/api/solutions", solutionRoutes);
app.use("/api/industries", industryRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/case-studies", caseStudyRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/contact", contactLimiter, contactRoutes);
app.use("/api/seo", seoRoutes);
app.use("/api/nav", navRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/home-content", homeContentRoutes);
app.use("/api/blog-categories", blogCategoryRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/case-study-categories", caseStudyCategory);
app.use("/api/case-studies", caseStudy);
app.use("/api/pages", pages);
app.use("/api/case-study-stories", caseStudyStoryRoutes);
app.use("/api/home-page", homePageRoutes);
app.use("/api/checklists", checklistRoutes);
app.use("/api/guides", guideRoutes);
app.use("/api/whitepapers", whitepaperRoutes);





// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "21/07/2026 update", env: process.env.NODE_ENV });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `🚀 JJC Systems Backend running on port ${PORT} [${process.env.NODE_ENV}]`
  );
});

module.exports = app;
