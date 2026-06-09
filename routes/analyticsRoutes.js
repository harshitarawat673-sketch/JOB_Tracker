const router = require("express").Router();

const auth = require("../middleware/authMiddleware");

const analytics = require(
  "../controllers/analyticsController"
);

router.get(
  "/insights",
  auth,
  analytics.getInsights
);

module.exports = router;


