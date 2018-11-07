const mongoose = require("mongoose");

const { Schema } = mongoose;
const BGReadingSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  reading: { type: Number, required: true, min: 10, max: 1000 },
  status: String,
  dateTaken: { type: Date, default: Date.now },
  notes: String
});

BGReadingSchema.pre("save", function(next) {
  /*
    specifics - high low normal :)
  */

  next();
});

module.exports = mongoose.model("BGReading", BGReadingSchema);
