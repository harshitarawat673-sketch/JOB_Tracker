const mongoose = require("mongoose");

const timelineSchema = new mongoose.Schema({
  status: String,
  date: {
    type: Date,
    default: Date.now
  }
});

const applicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  company: {
    type: String,
    required: true
  },

  role: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: [
      "Applied",
      "Interview",
      "Rejected",
      "Offer"
    ],
    default: "Applied"
  },

  appliedDate: {
    type: Date,
    default: Date.now
  },

  timeline: [timelineSchema]
});

module.exports = mongoose.model("Application", applicationSchema);