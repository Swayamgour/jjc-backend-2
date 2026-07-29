const mongoose = require("mongoose");
require("dotenv").config();

// const testimonialSeed = require("./testimonialSeed");
// const faqSeed = require("./faqSeed");
const detailedServicesSeed = require("./detailedServicesSeed");



async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");

    // await faqSeed();
    await detailedServicesSeed();

    console.log("✅ Seed Completed");

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();