const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isEmail } = require("validator");

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: { type: String, required: true }
});

//validation
UserSchema.path("email").validate(
  val => isEmail(val),
  "Please provide a valid email."
);
UserSchema.path("password").validate(
  val => val.length >= 6,
  "Password must be atleast 6 characters."
);

//presave hooks
UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

//methods
UserSchema.methods.isCorrectPassword = function(val) {
  return bcrypt.compare(val, this.password);
};

UserSchema.methods.generateToken = function(TTL = "24h") {
  return jwt.sign(
    {
      _id: this._id
    },
    process.env.JWT_SECRET,
    {
      expiresIn: TTL
    }
  );
};

UserSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateToken("7d")
  };
};

module.exports = mongoose.model("User", UserSchema);
