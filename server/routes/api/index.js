const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/blood-glucose-readings", require("./bGReading"));

module.exports = router;
