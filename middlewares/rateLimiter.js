const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 60 * 1000, // 1 hrs in milliseconds
  max: 2,
  message: {err:'You have exceeded the 2 requests in 1 hrs limit!'}, 
  headers: true,
});

module.exports = rateLimiter;