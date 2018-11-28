module.exports = (err, req, res, next) => {
  if (err.name == "ValidationError") {
    err.code = 422;
  }
  const code = err.code || 500;
  const message = err.message || "Oops, something went wrong.";

  if (process.env.NODE_ENV !== "production" && code === 500) {
    console.log(err.stack);
  }

  res.status(code).json({ error: { message, code } });
};
