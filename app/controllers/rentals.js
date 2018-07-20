const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Rental = mongoose.model('Rental');
var ObjectId = require('mongodb').ObjectID;


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
  rental.save().then( rental => {
    if (rental)
      res.json({rental});
  }).catch( errors =>{
    res.status(505).json({message: errors.message});
  });
});

router.get('/:id', (req, res) => {
  console.log('/rentals get one')
  Rental.find({_id: ObjectId(req.params.id)}).then( rental => {
    if (rental)
      res.json({ rental });
  }).catch( errors =>{
    res.status(404).json({message: errors.message});
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
