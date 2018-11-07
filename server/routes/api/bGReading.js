const router = require("express").Router();
const bgrController = require("../../controllers/bGReading");
const { requireAuth, ensureCorrectUser } = require("../../middleware/auth");

router
  .route("/")
  .get(requireAuth, bgrController.get)
  .post(requireAuth, bgrController.create);

router
  .route("/:user_id/:_id")
  .put(requireAuth, ensureCorrectUser, bgrController.update)
  .delete(requireAuth, ensureCorrectUser, bgrController.delete);

module.exports = router;
