const EggInformation = require("../models/EggInformation"); // Import EggInformation model
const Patient = require("../models/PaientModel")
const AppError = require("../utils/appError"); // Custom error handling
const ApiResponse = require("../utils/apiResponse"); // Standard API response format
const Embryo = require("../models/Embryo");

// 📌 Create Egg Information
// exports.createEggInformation = async (req, res, next) => {
//   try {
//     const { patientId, retrievedEggs } = req.body;
//     const doctorId = req.user.id;

//     // Generate a 6-digit eggId
//     const eggId = Math.floor(100000 + Math.random() * 900000).toString();

//     // Check for required fields
//     if (!patientId || !doctorId || !retrievedEggs) {
//       return next(new AppError("Missing required fields", 400));
//     }

//     // Create new Egg Information entry
//     const newEggInfo = await EggInformation.create({
//       patientId,
//       doctorId,
//       eggId,
//       retrievedEggs,
//     });

//     // Success response
//     res.status(201).json(new ApiResponse(201, newEggInfo, "Egg information created successfully"));
//   } catch (err) {
//     return next(new AppError("Failed to create egg information", 500));
//   }
// };
exports.createEggInformation = async (req, res, next) => {
  try {
    const { patientId, retrievedEggs } = req.body;
    const doctorId = req.user.id;

    // Check for required fields
    if (!patientId || !doctorId || !retrievedEggs || retrievedEggs <= 0) {
      return next(new AppError("Missing or invalid required fields", 400));
    }

    // Create multiple Egg Information entries
    const eggEntries = [];
    for (let i = 0; i < retrievedEggs; i++) {
      try {
        const eggId = Math.floor(100000 + Math.random() * 900000).toString(); // Generate unique egg ID
        const newEgg = await EggInformation.create({
          patientId,
          doctorId,
          eggId,
        });
        eggEntries.push(newEgg);
      } catch (createError) {
        console.error("Error creating egg entry:", createError);
        return next(new AppError("Failed to create some egg information", 500));
      }
    }

    // Success response
    res.status(201).json(new ApiResponse(201, eggEntries, "Egg information created successfully"));

  } catch (err) {
    console.error("Error in createEggInformation:", err);
    return next(new AppError("Failed to create egg information", 500));
  }
};


// 📌 Get All Egg Information
exports.getAllEggInformation = async (req, res, next) => {
  try {
    const eggInfo = await EggInformation.find().populate("patientId doctorId");

    // Success response
    res.status(200).json(new ApiResponse(200, eggInfo, "Egg information retrieved successfully"));
  } catch (err) {
    return next(new AppError("Failed to fetch egg information", 500));
  }
};

// 📌 Get Single Egg Information by ID
exports.getEggInformationById = async (req, res, next) => {
  try {
    const eggInfo = await EggInformation.findById(req.params.id).populate("patientId doctorId");

    if (!eggInfo) return next(new AppError("Egg information not found", 404));

    // Success response
    res.status(200).json(new ApiResponse(200, eggInfo, "Egg information retrieved successfully"));
  } catch (err) {
    return next(new AppError("Failed to fetch egg information", 500));
  }
};

exports.getEggInformationByPatientId = async (req, res, next) => {
  console.log(req.params.patientId)
  try {
    const eggInfo = await EggInformation.findOne({ patientId: req.params.patientId });


    if (!eggInfo) return next(new AppError("Egg information not found", 404));

    // Success response
    res.status(200).json(new ApiResponse(200, eggInfo, "Egg information retrieved successfully"));
  } catch (err) {
    return next(new AppError("Failed to fetch egg information", 500));
  }
};

exports.getAllEggInformationById = async (req, res, next) => {
  try {
    console.log("Fetching eggs for patientId:", req.params.patientId);

    const eggInfo = await EggInformation.find({ patientId: req.params.patientId });

    // console.log("Query Result:", eggInfo);

    if (eggInfo.length === 0) {
      console.log("No egg information found");
      return next(new AppError("Egg information not found", 404));
    }

    res.status(200).json(new ApiResponse(200, eggInfo, "Egg information retrieved successfully"));
  } catch (err) {
    console.error("Error fetching egg information:", err);
    return next(new AppError("Failed to fetch egg information", 500));
  }
};

// 📌 Update Egg Information
exports.updateEggInformation = async (req, res, next) => {
  try {
    const { eggId, attachReason } = req.body;

    if (!eggId) return next(new AppError("Egg ID is required", 400));

    const updatedEggInfo = await EggInformation.findOneAndUpdate(
      { eggId: eggId }, // Find by eggId instead of req.params.id
      { attachReason },
      { new: true }
    );
    console.log(updatedEggInfo)
    if (!updatedEggInfo) return next(new AppError("Egg information not found", 404));

    // Success response
    res.status(200).json(new ApiResponse(200, updatedEggInfo, "Egg information updated successfully"));
  } catch (err) {
    return next(new AppError("Failed to update egg information", 500));
  }
};

exports.updateEggInformationSecond = async (req, res, next) => {
  try {
    const { eggId, date, details, status, patientId } = req.body;

    if (!eggId) return next(new AppError("Egg ID is required", 400));

    const updatedEggInfo = await EggInformation.findOneAndUpdate(
      { eggId: eggId }, // Find by eggId instead of req.params.id
      { date, details, status, patientId }, // Correctly structured update object
      { new: true } // Return updated document
    );

    console.log(updatedEggInfo);
    
    if (!updatedEggInfo) return next(new AppError("Egg information not found", 404));

    // Success response
    res.status(200).json(new ApiResponse(200, updatedEggInfo, "Egg information updated successfully"));
  } catch (err) {
    return next(new AppError("Failed to update egg information", 500));
  }
};

// 📌 Delete Egg Information
exports.deleteEggInformation = async (req, res, next) => {
  try {
    const deletedEggInfo = await EggInformation.findByIdAndDelete(req.params.id);

    if (!deletedEggInfo) return next(new AppError("Egg information not found", 404));

    // Success response
    res.status(200).json(new ApiResponse(200, null, "Egg information deleted successfully"));
  } catch (err) {
    return next(new AppError("Failed to delete egg information", 500));
  }
};



exports.patientRequestConfirm = async (req, res, next) => {
  try {

    const { eggId } = req.params; // Extract eggId from request body
    console.log(eggId)
    if (!eggId) {
      return res.status(400).json({ message: "Egg ID is required." });
    }

    // Find the egg information record for the given patient and egg ID
    const eggInfo = await EggInformation.findOne({ eggId });
    console.log(eggInfo)
    if (!eggInfo) {
      return res.status(404).json({ message: "Egg information not found." });
    }

    // Update patient request to "Confirm"
    eggInfo.patientRequest = "Confirm";
    await eggInfo.save();

    res.status(200).json({ message: "Patient request confirmed successfully.", eggInfo });
  } catch (error) {
    console.error("Error confirming patient request:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


exports.doctorConfirmation = async (req, res, next) => {
  try {
    const { eggId } = req.params; // Extract eggId from request params

    if (!eggId) {
      return res.status(400).json({ message: "Egg ID is required." });
    }

    // Find the egg information record using the given eggId
    const eggInfo = await EggInformation.findOne({ eggId });

    if (!eggInfo) {
      return res.status(404).json({ message: "Egg information not found." });
    }

    // Check if the patient request is confirmed before updating doctor confirmation
    if (eggInfo.patientRequest !== "Confirm") {
      return res.status(400).json({ message: "Patient Side request is not confirmed yet." });
    }

    // Update doctor confirmation to true
    eggInfo.doctorConfirmation = "Confirm";
    await eggInfo.save();

    res.status(200).json({
      message: "Doctor confirmation successful.",
      eggInfo,
    });
  } catch (error) {
    console.error("Error confirming doctor request:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

exports.doctorConfirmationDney = async (req, res, next) => {
  try {
    const { eggId } = req.params; // Extract eggId from request params

    if (!eggId) {
      return res.status(400).json({ message: "Egg ID is required." });
    }

    // Find the egg information record using the given eggId
    const eggInfo = await EggInformation.findOne({ eggId });

    if (!eggInfo) {
      return res.status(404).json({ message: "Egg information not found." });
    }

    // Check if the patient request is confirmed before updating doctor confirmation
    if (eggInfo.patientRequest !== "Confirm") {
      return res.status(400).json({ message: "Patient Side request is not confirmed yet." });
    }
    // Update doctor confirmation to true
    eggInfo.doctorConfirmation = "Denied";
    await eggInfo.save();

    res.status(200).json({
      message: "Doctor confirmation successful.",
      eggInfo,
    });
  } catch (error) {
    console.error("Error confirming doctor request:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


exports.verificationOfSperm = async (req, res, next) => {
  try {
    const { eggId, patientId, husbandId } = req.params; // Extract values from request params
        const doctorId = req.user.id;
    if (!eggId) {
      return res.status(400).json({ message: "Egg ID is required." });
    }

    // Find the egg information record using the given eggId
    const eggInfo = await EggInformation.findOne({ eggId });

    if (!eggInfo) {
      return res.status(404).json({ message: "Egg information not found." });
    }

    // Check if the patient request is confirmed before updating doctor confirmation
    if (eggInfo.patientRequest !== "Confirm" && eggInfo.doctorConfirmation !== "Confirm") {
      return res.status(400).json({ message: "Patient OR Doctor request is not confirmed yet." });
    }

    const patient = await Patient.findOne({ patientId });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found." });
    }

    console.log("Patient Husband ID:", patient.partnerId, "Husband ID:", husbandId);
  
    // Validate husband's ID
    if (Number(patient.partnerId) !== Number(husbandId)) {
      return res.status(400).json({ message: "Husband's ID does not match the registered husband." });
    }

    // Update egg status

    // Save updates
    await eggInfo.save();
    await patient.save();

    // Generate a unique 7-digit embryo ID
    const embryoId = Math.floor(1000000 + Math.random() * 9000000).toString();

    // Create the Embryo record
    const newEmbryo = await Embryo.create({
      embryoId,
      doctorId,
      patientId: patient.patientId,
      fertilizationDate: new Date(),
    });

    res.status(201).json({
      message: "Verification successful.",
      eggInfo,
      patient,
      embryo: newEmbryo,
    });

  } catch (error) {
    console.error("Error confirming doctor request:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

