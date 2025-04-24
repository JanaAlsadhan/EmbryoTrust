const Embryo = require("../models/Embryo");
const AppError = require("../utils/appError");
const ApiResponse = require("../utils/apiResponse");
const Patient = require("../models/PaientModel");

exports.verifyHusbandBySpermOwner = async (req, res) => {
  try {
    const { patientId, spermOwnerId } = req.body;

    // Ensure both IDs are provided
    if (!patientId || !spermOwnerId) {
      return res.status(400).json({ success: false, message: "Both patientId and spermOwnerId are required." });
    }

    // Find the patient (should be a woman)
    const patient = await Patient.findOne({ patientId });
    if (!patient) {
      return res.status(404).json({ success: false, message: "Patient not found." });
    }

    // Ensure the patient is a woman
    if (patient.gender !== "Female") {
      return res.status(400).json({ success: false, message: "This patient is not a woman." });
    }

    // Ensure she has a partner
    if (!patient.partnerId) {
      return res.status(400).json({ success: false, message: "This woman does not have a registered husband." });
    }

    // Verify that the sperm owner is actually her husband
    if (patient.partnerId !== spermOwnerId) {
      return res.status(403).json({ success: false, message: "Sperm owner ID does not match the registered husband." });
    }

    // Find the husband
    const husband = await Patient.findOne({ patientId: spermOwnerId });
    if (!husband) {
      return res.status(404).json({ success: false, message: "Husband not found in the system." });
    }

    // Ensure the partner is a man
    if (husband.gender !== "Male") {
      return res.status(400).json({ success: false, message: "The registered partner is not a man." });
    }

    // Success Response
    return res.status(200).json({
      success: true,
      message: "Husband verification successful.",
      patient: {
        patientId: patient.patientId,
        name: patient.name,
        gender: patient.gender
      },
      husband: {
        patientId: husband.patientId,
        name: husband.name,
        gender: husband.gender
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};




// 📌 Create a new Embryo Record
exports.createEmbryo = async (req, res, next) => {
  try {
    const { patientId } = req.body;

    if (!patientId) {
      return next(new AppError("Missing required fields", 400));
    }

    const newEmbryo = await Embryo.create({ patientId, embryoId, fertilizationDate, status });

    res.status(201).json(new ApiResponse(201, newEmbryo, "Embryo record created successfully"));
  } catch (err) {
    return next(new AppError("Failed to create embryo record", 500));
  }
};

// 📌 Get All Embryo Records
exports.getAllEmbryos = async (req, res, next) => {
  try {
    const embryos = await Embryo.find().populate("patientId");

    res.status(200).json(new ApiResponse(200, embryos, "Embryo records retrieved successfully"));
  } catch (err) {
    return next(new AppError("Failed to fetch embryo records", 500));
  }
};

// 📌 Get Embryo by ID
exports.getEmbryoByPatientId = async (req, res, next) => {
  try {
    
    const embryo = await Embryo.findOne({patientId :req.params.patientId});

    if (!embryo) return next(new AppError("Embryo record not found", 404));

    res.status(200).json(new ApiResponse(200, embryo, "Embryo record retrieved successfully"));
  } catch (err) {
    return next(new AppError("Failed to fetch embryo record", 500));
  }
};

// 📌 Update Embryo Record
exports.updateEmbryo = async (req, res, next) => {
  try {
    console.log( req.body)
    const updatedEmbryo = await Embryo.findOneAndUpdate(
      { patientId: req.params.patientId }, // Search by patientId
      req.body, // Data to update
      { new: true } // Return the updated document
    );
    
    if (!updatedEmbryo) return next(new AppError("Embryo record not found", 404));

    res.status(200).json(new ApiResponse(200, updatedEmbryo, "Embryo record updated successfully"));
  } catch (err) {
    return next(new AppError("Failed to update embryo record", 500));
  }
};

// 📌 Delete Embryo Record
exports.deleteEmbryo = async (req, res, next) => {
  try {
    const deletedEmbryo = await Embryo.findByIdAndDelete(req.params.id);

    if (!deletedEmbryo) return next(new AppError("Embryo record not found", 404));

    res.status(200).json(new ApiResponse(200, null, "Embryo record deleted successfully"));
  } catch (err) {
    return next(new AppError("Failed to delete embryo record", 500));
  }
};
