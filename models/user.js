const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// IMPORTANT FIX 👇
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

// Apply plugin (NOW it is a function)
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
