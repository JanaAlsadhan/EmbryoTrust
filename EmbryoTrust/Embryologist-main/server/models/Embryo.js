const mongoose = require("mongoose");

const embryoSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  embryoId: { type: String, required: true },
  fertilizationDate: { type: Date, default: Date.now }, 
  status: {
    type: String,
    enum: ["Growing", "Frozen", "Transferred", "Discarded"],
  },
  hash: { type: String },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" }, 
},{ timestamps: true });

const Embryo = mongoose.model("Embryo", embryoSchema);
module.exports = Embryo;
