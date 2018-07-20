const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LandlordSchema = new Schema({
  fullName:{
    type: String,
    required: true
  },
  phoneNumber: {
    type: String
  },
  position: {
    type: String
  }
}, { timestamps: true });

mongoose.model('Landlord', LandlordSchema);
