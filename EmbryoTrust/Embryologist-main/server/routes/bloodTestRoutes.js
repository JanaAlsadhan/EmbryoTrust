const express = require("express");
const router = express.Router();
const {
  createBloodTest,
  getAllBloodTests,
  getBloodTestById,
  updateBloodTest,
  deleteBloodTest,
} = require("../controllers/bloodTestController");
const { checkFertility , protect } = require("../middelwares/authMiddleware");

// Routes
router.post("/",protect , checkFertility, createBloodTest);
router.get("/", getAllBloodTests);
router.get("/:id", getBloodTestById);
router.put("/:id", updateBloodTest);
router.delete("/:id", deleteBloodTest);

module.exports = router;
