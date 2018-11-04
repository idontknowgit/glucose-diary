const router = require("express").Router();
const authController = require("../../controllers/auth");
const { requireAuth } = require("../../middleware/auth");

router
  .route("/")
  .get(requireAuth, authController.refreshSession)
  .post(authController.login);

router.post("/register", authController.register);

module.exports = router;
