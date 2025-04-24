const express = require("express");

const router = express.Router();
const {
  createEggInformation,
  getAllEggInformation,
  getEggInformationById,
  updateEggInformation,
  deleteEggInformation,
  getEggInformationByPatientId,
  patientRequestConfirm,
  doctorConfirmation,
  verificationOfSperm,
  getAllEggInformationById,
  updateEggInformationSecond,
  doctorConfirmationDney
} = require("../controllers/eggInformationController");
const { checkFertility ,   checkEmbryologist , protect } = require("../middelwares/authMiddleware");

// Routes
router.post("/", protect , checkFertility , createEggInformation);
router.post("/patientrequest/:eggId", protect  , patientRequestConfirm);
router.post("/doctorcomfrimation/:eggId" , protect ,checkFertility , doctorConfirmation);
router.post("/doctorcomfrimation/dney/:eggId" , protect ,checkFertility , doctorConfirmationDney);
router.get("/:patientId", getEggInformationByPatientId);
router.get("/all/:patientId", getAllEggInformationById);
router.get("/", getAllEggInformation);
router.get("/:id", getEggInformationById);

router.put("/", updateEggInformation);
router.put("/update", updateEggInformationSecond);
// {patientId}/${eggId}/${husbandId
router.patch("/verification/:patientId/:eggId/:husbandId", protect , checkEmbryologist,verificationOfSperm);
router.delete("/:id", deleteEggInformation);

module.exports = router;
