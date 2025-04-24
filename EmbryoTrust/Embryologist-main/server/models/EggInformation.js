const mongoose = require("mongoose");

const EggInformationSchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    Name:{type:String, default:"Egg Info"},
    eggId: {
      type: String,
      required: true,
    },
    collectionDate: {
      type: Date,
      Date, default: Date.now
    },
    status: {
      type: String,
      enum: ["Pending", "Retrieved"],
      default: "Pending",
    },
    details: {
      type: String,
    },
    patientRequest: {
      type: String,
      enum: ["Confirm", "Deny" ],
      default: "Deny",
    },
    doctorConfirmation: {
      type: String,
      enum: ["Confirm", "Denied"],
    
    },
    attachReason: {
      type: String,
      default: null,
    },
    hash: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EggInformation", EggInformationSchema);
