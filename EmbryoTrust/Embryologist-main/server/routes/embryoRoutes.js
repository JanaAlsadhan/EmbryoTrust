const express = require("express");
const router = express.Router();
const {
  createEmbryo,
  getAllEmbryos,
  getEmbryoByPatientId,
  updateEmbryo,
  deleteEmbryo,
} = require("../controllers/embryoController");
const { checkEmbryologist, checkFertility } = require("../middelwares/authMiddleware");

// Routes
router.post("/", createEmbryo);
router.get("/", getAllEmbryos);
router.get("/:patientId", getEmbryoByPatientId);
router.put("/:patientId", updateEmbryo);
router.delete("/:id", deleteEmbryo);

module.exports = router;
