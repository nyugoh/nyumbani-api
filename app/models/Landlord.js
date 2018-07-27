const mongoose = require('mongoose');
import bcrypt from 'bcrypt';
const Schema = mongoose.Schema;

const LandlordSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  providerId: {
    type: String
  },
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

LandlordSchema.methods.generateHash = password => bcrypt.genSalt(10).then( salt => salt ).then( salt => bcrypt.hash(password, salt)).then( hash => hash);

LandlordSchema.methods.compareHash = (hash, password) => bcrypt.compare(password, hash).then( isMatch => isMatch);

mongoose.model('Landlord', LandlordSchema);
