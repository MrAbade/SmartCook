'use strict';
module.exports = (req, res, next) => {
  // Before this server is publish, change the <header-method> above, to accept requisitions only of our website
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
};
