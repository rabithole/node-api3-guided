const express = require('express'); // importing a CommonJS module

const hubsRouter = require('./hubs/hubs-router.js');
const helmet = require('helmet');
const morgan = require('morgan')

const server = express();

// use is how we register middleware. 
server.use(express.json());
server.use(helmet());
// server.use(morgan('tiny'));

// custom middleware
// This chain or stack can be used to stop going through the stack. 
server.use(methodLogger); // This is custom middleware...
server.use(addName);
// server.use(lockout); // This function stops the stack processing. 

server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : ''; // Look at the addName function. 
  
  // The below code returns...
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p> `); // nameInsert is injected via the middleware functio addName...
});

function methodLogger(req, res, next) {
  console.log(`${req.method} Request`);
  next();
}

function addName(req, res, next) {
  req.name = req.name || 'Rufus';
  next();
}
// current second on the clock is a multiple of three
function lockout(req, res, next) {
  res.status(403).json({ message: 'api lockout in force' })
}


// Some good math work here...
function lockout(req, res, next) {
  var d = new Date().getSeconds();
  if (d % 2 !== 0) {
    res
      .status(403)
      .send("Balance is the key, making things even is the secret to success.");
  } else {
    next();
  }
} 

module.exports = server;
