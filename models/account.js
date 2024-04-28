const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    require: true,
    unique: true,
    match:
      /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+/,
  },
  password: { type: String, required: true },
  type: { type: String, enum: ["Customer", "Receiver","Employee"], required: true },
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
