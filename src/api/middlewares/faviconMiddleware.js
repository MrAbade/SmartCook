'use strict';
module.exports = (req, res, next) => {
  if (req.url === '/favicon.ico') {
    res.writeHead(200, {'Content-Type': 'image/x-icon'});
    res.end('');
  } else {
    next();
  }
}