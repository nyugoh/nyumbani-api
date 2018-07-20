const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Location = mongoose.model('Location');

module.exports = (app) => {
  app.use('/api/v1/locations', router);
};

/*Location.aggregate([
  {
    $lookup: {
      "from": "blogs",
      "localField": "name",
      "foreignField": "location",
      "as": "articles"
    }
  }
])*/
router.get('/', (req, res) => {
  Location.find({}).then( locations => {
    if (locations)
      res.json({ locations});
  }).catch( errors =>{
    res.status(404).json({message: errors.message});
  });
});

router.post('/', (req, res) => {
  const location = new Location(req.body.location);
  location.save().then( location => {
    if (location)
      res.json({location});
  }).catch( errors =>{
    res.status(404).json({message: errors.message});
  });
});

router.delete('/delete/:id', (req, res) => {
  Location.findByIdAndRemove(req.params.id).then( response => {
    if (response)
      res.json({ id: req.params.id });
  }).catch( errors =>{
    res.status(404).json({ message: errors.message });
  });
});

router.get('/*', (req, res) => {
  res.status(505).json({ message: 'You have hit a wild-route' });
});
