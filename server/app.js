const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 9080;
const pipelineConfigRoute=require('./route/pipelineConfig.route')
const projectConfigRoute=require('./route/projectsConfig.route')
const executionsConfigRoute=require('./route/executionsConfig.route');
const http = require('http').Server(app);
const config = require('./config');
const path = require('path');
const _ = require('lodash');

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

app.use(cookieParser());
app.use(bodyParser());

mongoose.connect('mongodb://localhost:27017/Database_CI');

app.use('/',executionsConfigRoute);
app.use('/',pipelineConfigRoute);
app.use('/',projectConfigRoute);

app.get('/',(req, res) => {
  res.send('Hello, World!');
});

function createApp() {
  const app = express();
  return app;
}

function setupStaticRoutes(app) {
  app.use(express.static(__dirname + '/public'));
  return app;
}

function setupMiddlewares(app) {
  app.use(require('cookie-parser')());
}

function setupRestRoutes(app) {
  app.use('/api/ci', require(path.join(__dirname, 'api')));
  return app;
}


module.exports = function(inputApp, inputOptions) {
  const app = inputApp || createApp();
  const options = inputOptions || {};

  _.defaults(options, {static: true, rest: true});

  if(options.static) {
    setupStaticRoutes(app);
  }

  if(options.rest) {
    setupMiddlewares(app);
    setupRestRoutes(app);
  }

  return app;
};

app.listen(port, function() {
  console.log('Express App listening on port ', port);
});
