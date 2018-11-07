const Jasmine = require("jasmine");
const jasmine = new Jasmine();

require("../index");

jasmine.loadConfigFile(__dirname + "/jasmine.json");
jasmine.execute();

/*

const mongoose = require("mongoose");
const User = mongoose.model("User");


mongoose.connect(
  "mongodb://localhost/sandbox_test",
  { useNewUrlParser: true, useCreateIndex: true }
);

mongoose.connection
  .once("open", () => {
    jasmine.loadConfigFile(__dirname + "/jasmine.json");

    mongoose.connection.db.dropDatabase(async () => {
      const { users } = mongoose.connection.collections;

      users.createIndex({ email: 1 }, { unique: true });
      global.testUser = await new User({
        email: "test1@test.com",
        password: "random123"
      }).save();

      global.testAuthHeader = `Bearer ${testUser.generateToken()}`;

      jasmine.execute();
    });
  })
  .on("error", err => console.log("Error connecting to db:", err));
*/
