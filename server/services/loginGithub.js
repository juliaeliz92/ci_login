const express = require('express');
const passport = require('passport');
const util = require('util');
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const GitHubStrategy = require('passport-github').Strategy;
const partials = require('express-partials');
const cookieParser = require('cookie-parser');
const router = express.Router();
const app = express();

module.exports=function(){
  app.use(cookieParser());
  app.use(session({secret: '6d3ffc81a5d35d3daea6236580bd57339f969281'}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(methodOverride());
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
router.get('/auth/github', function(req,res){
  console.log('printing.......');
});
router.get('/auth/github/callback',
passport.authenticate('github',{failureRedirect: '/'}),
function(req,res){
  res.redirect('/createRepo')});
}
