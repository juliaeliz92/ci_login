const express = require('express');
const app = express();
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 9080;
const pipelineConfigRoute=require('./route/pipelineConfig.route')
const projectConfigRoute=require('./route/projectsConfig.route')
const executionsConfigRoute=require('./route/executionsConfig.route');

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

app.use(cookieParser());
app.use(session({secret: '6d3ffc81a5d35d3daea6236580bd57339f969281'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride());
app.use(bodyParser());

mongoose.connect('mongodb://localhost:27017/Database_CI');

app.use('/',executionsConfigRoute);
app.use('/',pipelineConfigRoute);
app.use('/',projectConfigRoute);

passport.use(new GitHubStrategy({
  clientID:'1f9e50435994ec317a50',
  clientSecret:'6d3ffc81a5d35d3daea6236580bd57339f969281',
  callbackURL:'http://127.0.0.1:3000/auth/github/callback'
},function(accessToken,refreshToken,profile,done,projects)
{
  done(null,{
    accessToken: accessToken,
    profile: profile
  });
}));
passport.serializeUser(function(user,done){
  done(null, user);
});
passport.deserializeUser(function(user,done)
{
  done(null,user);
});

app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/callback', passport.authenticate('github',{failureRedirect: '/'}),
function(req,res){
  res.redirect('/createRepo')});

app.listen(port, function() {
  console.log('Express App listening on port ', port);
});
