const User = require("mongoose").model("User");

exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (
      (await User.countDocuments({
        email: new RegExp(`^${email}$`, "i")
      })) !== 0
    ) {
      return next({
        statusCode: 403,
        message: "This email is already in use."
      });
    }

    const user = await new User({ email, password }).save();

    res.json({ data: user.toAuthJSON() });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const error = { statusCode: 401, message: "Invalid email or password." };

    if (!email || !password) {
      return next(error);
    }

    const user = await User.findOne({
      email: new RegExp(`^${email}$`, "i")
    });

    if (!user || !(await user.isCorrectPassword(password))) {
      return next(error);
    }

    res.json({ data: user.toAuthJSON() });
  } catch (err) {
    next(err);
  }
};

exports.refreshSession = async (req, res, next) => {
  try {
    res.json({ data: res.locals.user.toAuthJSON() });
  } catch (err) {
    next(err);
  }
};
