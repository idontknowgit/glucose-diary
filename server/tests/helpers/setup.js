const mongoose = require("mongoose");

beforeAll(done => {
  mongoose.connect(
    "mongodb://localhost/sandbox_test",
    { useNewUrlParser: true, useCreateIndex: true }
  );
  mongoose.connection
    .once("open", () => done())
    .on("error", err => console.log("Error connecting to db:", err));
});
