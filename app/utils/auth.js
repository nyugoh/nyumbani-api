const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Landlord = mongoose.model('Landlord');

exports.auth = function (req, res, next) {
  let header = req.headers;
  let authHeader = header.authorization
  let token = authHeader.split(' ')[1];
  let tokenDecoded = jwt.decode(token, process.env.JWT_TOKEN);
  Landlord.findOne({ email: tokenDecoded.email }).then(user => {
    if (user)
      req.user = user;
  }).catch(error => {
    console.log(error);
  });
  next();
}
