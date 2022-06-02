const mongoose = require("mongoose")
const Schema = mongoose.Schema
const deviceSchema = new Schema({
  uid: { type: Number, required: true },
  vendor: { type: String, required: true },
  status: { type: String, enum: ["online", "offline"], type: String },
  created_date: { type: Date, required: true, default: Date.now() },
  gateway: { type: mongoose.Schema.Types.ObjectId, ref: "" }
})
module.exports = mongoose.model('Device', deviceSchema)