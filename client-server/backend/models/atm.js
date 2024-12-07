const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const atmUserSchema = new Schema({
  accountID: Number,
  password: String,
  money: Number,
  name: String,
});

const ATMUser = mongoose.model("ATMUser", atmUserSchema);

module.exports = ATMUser;
