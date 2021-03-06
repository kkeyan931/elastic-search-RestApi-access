const express = require('express');
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');
const rateLimiter = require('./middlewares/rateLimiter');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(rateLimiter);


process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
let port = process.env.PORT || 3000;

app.use('/api/v1', routes);
app.listen(port, ()=>{
  console.log(`The server is listening on port ${port}`)
})