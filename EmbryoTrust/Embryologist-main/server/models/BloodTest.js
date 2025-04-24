const mongoose = require("mongoose");

const bloodTestSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  testDate: { type: Date, required: true, default: Date.now },
  Name:{type:String, default:"Blood Test"},
  hcgLevel: { type: Number, required: true },
  hcgUnit: { type: String, enum: ["mIU/mL", "IU/L"], required: true },
  result: { type: String, enum: ["Positive", "Negative"], required: true },
  remarks: { type: String, default: "" },
  hash: { type: String },
});

const BloodTest = mongoose.model("BloodTest", bloodTestSchema);
module.exports = BloodTest;
