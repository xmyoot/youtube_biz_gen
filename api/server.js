const express = require('express');
const cors = require('cors');
const logRequests = require('./middleware/logRequests.js')
const apiRules = require('./middleware/apiRules.js');
const config =  require('./config/config.js');
const notFound = require('./middleware/errorHandler.js')
const Logging = require('./lib/Logging.js')
const morgan = require('morgan')
const healthCheck = require('./')

const app = express();

const StartServer = () => {
  /* Database Sync */
  const sync = async () => await config.psql.sequelize.sync({ alter: true });
  sync();

  /* Middleware */
  app.use(cors({ credentials: true, origin: true }));
  app.use(logRequests); //Log the requests/response status
  app.use(morgan('tiny')); //Logs request/response in a minimal format
  app.use(express.urlencoded({ extended: true })); // Allows recognition incoming request object as strings or arrays
  app.use(express.json()); //Allow json to be parsed from the incoming requests
  app.use(notFound);

  /* Rules of our API */
  app.use(apiRules);

  /* Routes */
  
  /* Healthcheck */
  app.get('/ping', (req, res) => {
    res.send('pong');
  });

  /* Run Server */
  app.listen(config.server.port, () => Logging.info(`Server listening on port: ${config.server.port}.`));
};
/* Connect to Database and start server */
const main = async () => {
  try {
    
    await config.psql.sequelize.authenticate();
    Logging.info('Connected to MySQL Database...');
    StartServer();
  } catch (error) {
    Logging.error(error);
  }
}

main();