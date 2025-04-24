const mongoose = require("mongoose");

const medicationScheduleSchema = new mongoose.Schema({
  patientId: { type : String, required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  medicineName: { type: String, required: true },
  dose: { type: String, required: true }, // Example: "500mg", "1 tablet"
  frequency: { type: String, required: true }, // Example: "Twice a day", "Every 6 hours"
  refills: { type: Number, default: 0 },
  prescribeDate: { type: Date, default: Date.now },
  hash: { type: String },
});

const MedicationSchedule = mongoose.model("MedicationSchedule", medicationScheduleSchema);
module.exports = MedicationSchedule;
