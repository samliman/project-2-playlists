//Dependencies 
const express = require('express');
const bcrypt = require('bcrypt');

//CLASSES
const router = express.Router();

//MODELS
const User =  require('../models/user');

//ROUTES
//Login Create Route
router.post('/login', async (req, res) => {
    try {
        const foundUser = await User.findOne({ username: req.body.username });
        if(foundUser){
            if(bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.message = '';
                req.session.username = foundUser.username;
                req.session.logged = true;
            res.redirect('/artists')
        } else {
            req.session.message = 'Username or password is incorrect';
            res.redirect('/');
        }
    } else {
        req.session.message = 'Username or password is incorrect';
        res.redirect('/');
      }
    } catch (err){
        res.send (err);
    }
});

//Register Create Route
router.post('/registration', async (req, res) => {
    //Hash found password and store as a variable
    const passwordHash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    
    //Attach altered password to user object
    const userDbEntry = {
        username: req.body.username,
        password: passwordHash,
        email: req.body.email
    };

    try {
        const createdUser = await User.create(userDbEntry);
        req.session.username = createdUser.username;
        req.session.logged = true;
        res.redirect('/artists');
    } catch(err) {
        res.send(err);
    }
})

//Logout Index Route 
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
    if(err){
        res.send(err);
    } else {
        res.redirect('/');
    }
  })

})

module.exports = router;