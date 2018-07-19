const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Rental = mongoose.model('Rental');

module.exports = (app) => {
  app.use('/api/v1/rentals', router);
};

router.get('/', (req, res) => {
  Rental.find().then( rentals => {
    if (rentals)
      res.json({ rentals});
  }).catch( errors =>{
    res.status(404).json({message: errors.message});
  });
});

router.post('/', (req, res) => {
  const rental = new Rental(req.body.rental);
  console.log(rental)
  rental.save().then( rental => {
    if (rental)
      Category.findOneAndUpdate({ name: rental.category }, { $inc: { rentals: 1} }, { new: true }).then( category => {
        res.json({status: 'ok', rental, category});
      })
  }).catch( errors =>{
    res.status(404).json({message: errors.message});
  });
});

router.get('/categories/:category', (req, res) => {
  Rental.find({ category: req.params.category }).then(rentals => {
    if (rentals)
      res.json({ rentals });
  }).catch(errors => {
    res.status(404).json({ message: errors.message });
  });
});

router.put('/edit', (req, res) => {
  Rental.findByIdAndUpdate(req.body.rental._id, req.body.rental, { new: true }).then( rental => {
    if (rental)
      res.json({status: 'ok', rental});
  }).catch( errors =>{
    res.status(404).json({message: errors.message});
  });
});

router.put('/archive/:id', (req, res) => {
  Rental.findById(req.params.id).then( rental => {
    if (rental){
      rental.status = rental.status === 0? 1: 0;
      rental.save().then(rental =>{
        if (rental)
          res.json({status: 'ok', rental});
      });
    }
  }).catch( errors =>{
    res.status(404).json({message: errors.message});
  });
});

router.delete('/delete/:id', (req, res) => {
  Rental.findByIdAndRemove(req.params.id).then( response => {
    if (response)
      res.json({ status: 'ok', id: req.params.id });
  }).catch( errors =>{
    res.status(404).json({ message: errors.message });
  });
});

router.get('/*', (req, res) => {
  res.status(505).json({ message: 'You have hit rental wild-route' });
});