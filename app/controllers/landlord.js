const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Landlord = mongoose.model('Landlord');

module.exports = (app) => {
  app.use('/api/v1/landlords', router);
};

/*Landlord.aggregate([
  {
    $lookup: {
      "from": "blogs",
      "localField": "name",
      "foreignField": "landlord",
      "as": "articles"
    }
  }
])*/
router.get('/', (req, res) => {
  Landlord.find({}).then( landlords => {
    if (landlords)
      res.json({ landlords});
  }).catch( errors =>{
    res.status(404).json({message: errors.message});
  });
});

router.post('/', (req, res) => {
  const landlord = new Landlord(req.body.landlord);
  landlord.save().then( landlord => {
    if (landlord)
      res.json({landlord});
  }).catch( errors =>{
    res.status(404).json({message: errors.message});
  });
});

router.delete('/delete/:id', (req, res) => {
  Landlord.findByIdAndRemove(req.params.id).then( response => {
    if (response)
      res.json({ id: req.params.id });
  }).catch( errors =>{
    res.status(404).json({ message: errors.message });
  });
});

router.get('/*', (req, res) => {
  res.status(505).json({ message: 'You have hit a wild-route' });
});
