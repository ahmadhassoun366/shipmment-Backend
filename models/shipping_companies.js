const mongoose = require("mongoose");

const shippingCompaniesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    require: true,
    unique: true,
    match:
      /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+/,
  },
  phone: {
    type: Number,
    required: true,
  },
});

const shippingCompanies = mongoose.model("shippingCompanies",
  shippingCompaniesSchema
);

module.exports = shippingCompanies;
