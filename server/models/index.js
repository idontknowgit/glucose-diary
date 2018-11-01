const mongoose = require("mongoose");

if (process.env.NODE_ENV !== "test") {
  mongoose.Promise = global.Promise;
  mongoose.connect(
    process.env.MONGODB_URI,
    {
      useNewUrlParser: true,
      useCreateIndex: true
    }
  );
  mongoose.connection
    .once("open", () => console.log("db connected"))
    .on("error", err => console.log("Error connecting to db:", err));
}
