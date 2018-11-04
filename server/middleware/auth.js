const jwt = require("jsonwebtoken");
const User = require("mongoose").model("User");

exports.requireAuth = async (req, res, next) => {
  const error = { statusCode: 401, message: "You are not authorized" };
  try {
    const { _id } = jwt.verify(getTokenFromHeader(req), process.env.JWT_SECRET);
    const user = await User.findById(_id);

    if (!user) {
      return next(error);
    }

    res.locals.user = user;
    next();
  } catch (err) {
    next(error);
  }
};

exports.ensureCorrectUser = (req, res, next) => {
  if (res.locals.user._id.toString() !== req.params.user_id) {
    return next({ statusCode: 401, message: "You are not authorized" });
  }

  next();
};

function getTokenFromHeader(req) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return null;
  }

  const [bearer, token] = authHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    return null;
  }

  return token;
}
