const express = require('express');
const router = express.Router();

const Celebrities = require('../models/Celebrity.model')


router.get('/', (req, res, next) => {

    Celebrities
        .find()
        .then(celebritiesFromDB => {
            console.log(celebritiesFromDB)
            res.render('celebrities/celebrities', { celebrities: celebritiesFromDB })
        })

});


router.get('/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')
})

router.post('/create', (req, res, next) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrities
        .create({ name, occupation, catchPhrase })
        .then(celebrities => {
            res.redirect('/celebrities')
        })
        .catch((err)=>next(err))
});



module.exports = router;