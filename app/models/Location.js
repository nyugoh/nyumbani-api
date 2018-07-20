const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  county:{
    type: String,
    required: true
  },
  subCounty: {
    type: String
  },
  town: {
    type: String
  }
}, { timestamps: true });

mongoose.model('Location', CategorySchema);
