const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  sendDate: {
    type: Date,
    default: Date.now()
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    default: "Pending"
  }
});

const Leave = mongoose.model("Leave", leaveSchema);
module.exports = Leave;
