
const express = require('express');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const dotenv = require('dotenv');



dotenv.load({ path: '.env.dev' });


const apiController = require('./controllers/api');


const app = express();


app.set('port', process.env.PORT || 5252);



app.get('/api/getData',apiController.getData);


app.use(errorHandler());


app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env')); 
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;