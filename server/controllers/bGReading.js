const BGReading = require("mongoose").model("BGReading");
const { startOfTimePeriod } = require("../modules/date");

exports.get = async (req, res, next) => {
  try {
    const { query } = req;
    query.user_id = res.locals.user._id;

    if (query.timePeriod) {
      query.dateTaken = {
        $gte: startOfTimePeriod(query.timePeriod)
      };
      delete query.timePeriod;
    }

    const readings = await BGReading.find(query);

    res.json({ data: readings });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const user_id = res.locals.user._id;
    const reading = await BGReading.create({ user_id, ...req.body });

    res.json({ data: reading });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { _id, user_id } = req.params;
    const reading = await BGReading.findOneAndUpdate(
      { _id, user_id },
      req.body,
      { new: true }
    );

    res.json({ data: reading });
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { _id, user_id } = req.params;
    const reading = await BGReading.findOneAndRemove({ _id, user_id });

    res.json({ data: { _id: reading._id } });
  } catch (err) {
    next(err);
  }
};
