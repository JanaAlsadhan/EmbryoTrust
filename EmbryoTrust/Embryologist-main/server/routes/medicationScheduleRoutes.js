const express = require("express");
const router = express.Router();
const {
  createMedicationSchedule,
  getAllMedicationSchedules,
  getMedicationScheduleById,
  updateMedicationSchedule,
  deleteMedicationSchedule,
} = require("../controllers/medicationScheduleController");
const { checkFertility , protect } = require("../middelwares/authMiddleware");

// Routes
router.post("/", protect , checkFertility , createMedicationSchedule);
router.get("/", getAllMedicationSchedules);
router.get("/:patientId", getMedicationScheduleById);
router.put("/:id", updateMedicationSchedule);
router.delete("/:id", deleteMedicationSchedule);

module.exports = router;
