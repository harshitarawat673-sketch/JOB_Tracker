const router = require("express").Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createApplication,
  getApplications,
  updateStatus,
  exportCSV,
  exportPDF
} = require("../controllers/applicationController");

router.post(
  "/",
  authMiddleware,
  createApplication
);

router.get(
  "/",
  authMiddleware,
  getApplications
);

router.put(
  "/:id/status",
  authMiddleware,
  updateStatus
);

router.get(
  "/export/csv",
  authMiddleware,
  exportCSV
);

router.get(
  "/export/pdf",
  authMiddleware,
  exportPDF
);

module.exports = router;