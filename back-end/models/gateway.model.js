const mongoose = require("mongoose")
const Schema = mongoose.Schema
const gatewaySchema = new Schema({
  serial_number: { unique: true, type: String },
  name: { type: String, required: true },
  ipV4: { type: String, required: true },
})
gatewaySchema.pre('remove', (next) => {
  this.model('Device').deleteMany({ gateway: this._id })
})
module.exports = mongoose.model('Gateway', gatewaySchema)