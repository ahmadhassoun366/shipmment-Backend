const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    required: true,
  },
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PostEmployee",
    required: true,
  },
});

const Warehouse = mongoose.model("Warehouse", warehouseSchema);

module.exports = Warehouse;
