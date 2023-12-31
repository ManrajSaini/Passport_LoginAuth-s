const express = require("express");
const passport = require("passport");

twitterRouter = express.Router();

twitterRouter.get("/", passport.authenticate(
    'twitter', {scope: ['tweet.read', 'users.read']}
));

twitterRouter.get("/callback",
    passport.authenticate('twitter', {
        successRedirect: 'callback/success',
        failureRedirect: 'callback/error'
    })
);

twitterRouter.get('/callback/success', (req,res) => {
    res.render('successTwitter', {user: req.user});
});

twitterRouter.get('/callback/error', (req,res) =>{
    res.send("Error Logging In");
});

twitterRouter.get('/logout', (req, res) => {
    req.session.destroy(function (err) {
    res.redirect('/');
  });
});

module.exports = twitterRouter;