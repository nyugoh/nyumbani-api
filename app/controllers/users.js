const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Landlord = mongoose.model('Landlord');

module.exports = (app) => {
  app.use('/api/v1/users', router);
};

router.post('/', (req, res) => {
  let { username, password } = req.body;
  Landlord.find({ email: username }).then( landlords => {
    if (landlords.length > 0) {
      let token = jwt.sign({ email: 'some@gmail.com'}, process.env.JWT_TOKEN);
      res.json({ access_token: 'aksdjaskl129390asdapsd90' });
    } else {
      res.status(400).json({error: 'User does\'t exist'});
    }
  }).catch( errors =>{
    res.status(400).json({error: errors.message});
  });
});

router.get('/*', (req, res) => {
  res.status(400).json({ error: 'You have hit a wild-route' });
});
