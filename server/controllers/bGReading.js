const BGReading = require("mongoose").model("BGReading");

exports.get = async (req, res, next) => {
  try {
    const { query } = req;
    query.user_id = res.locals.user._id;

    if (query.fromDate) {
      query.dateTaken = { $gte: new Date(query.fromDate) };
      delete query.fromDate;
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
