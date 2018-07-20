const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  buildingName:{
    type: String,
    required: true
  },
  monthlyRent: {
    type: Number
  },
  depositAmount: {
    type: Number
  },
  type: {
    type: String
  },
  hasTiles: {
    type: String
  },
  hasSink: {
    type: String
  },
  hasBalcony: {
    type: String
  },
  hasElectricity: {
    type: String
  },
  noWindows: {
    type: Number
  },
  noTaps: {
    type: Number
  },
  noSockets: {
    type: Number
  },
  condition: {
    type: String
  },
  contactPersonPosition: {
    type: String
  },
  location: {
    type: String
  },
  landlord: {
    type: String
  },
  reviews: {
    type: String
  },
  imageUrl: {
    type: String,
    default: "https://www.emberjs.com/images/tomsters/emberconf-2017-fcff003f.png"
  },
  verified: {
    type: Boolean,
    default: false
  },
  status: {
    type: Number,
    default: 0
  }
}, { timestamps: true });


module.exports = mongoose.model('Rental', BlogSchema);
