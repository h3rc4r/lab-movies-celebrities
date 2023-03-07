const express = require('express');
const router = express.Router();

const Movies = require('../models/Movies.model')
const Celebrities = require('../models/Celebrity.model')

// ver las pelis

router.get('/', (req, res, next) => {

    Movies
        .find()
        
        .then(moviesFromDB => {
            res.render('movies/movies', { movies: moviesFromDB })
        })
        .catch(err => next(err))
});





// crear pelis

router.get('/create', (req, res, next) => {

    Celebrities
        .find()
        .then(celebrity => {
            
            res.render('movies/new-movie', { celebrity })
        })
        .catch((err)=>next(err))
})

router.post('/create', (req, res, next) => {

    let { title, genre, plot, cast } = req.body

    Movies
        .create({ title, genre, plot, cast })
        .then(result => {
            res.redirect('/movies')
        })
        .catch(res.render("movies/new-movie"))
});

//ver detalles

router.get('/:_id', (req, res, next) => {

    let movies_id = req.params

    Movies
        .findById(movies_id)
        .populate('cast')
        .then(movies=> {
            res.render('movies/movie-detail', {movies})
        })
        .catch(err => next(err))
})


// Delete   
router.post("/:_id/delete", (req, res, next) => {
    let movies_id = req.params.id
    Movie.findByIdAndRemove(movies_id)
        .then(movies => {
            res.redirect("/movies")
        })
        .catch(err => next(err))
})

// editar pelis


// router.get('/:_id/edit', (req, res) => {

//     let movies_id = req.params.id

//     Movies

//         .findById(movies_id)
//         .then(movies => {
//             Celebrities
//                 .find()
//                 .then(celebritiesFromDB => {
//                     console.log(movies)
//                     res.render('movies/edit-movie', { movies, celebritiesFromDB })
//                 })

//         })
//         .catch(err => console.log(err))
// })


router.get("/:_id/edit", (req, res, next) => {
    let movies_id = req.params.id
    Movies.findById(movies_id)
        .then(movies => {
            let movie = movies;
            Celebrities.find()
                .then(movies => {
                    let actores = movies;
                    res.render("movies/edit-movie", { movie, actores })
                })
        })
        .catch(err => next(err))
})


// router.post('/:_id/edit', (req, res) => {

//     const { title, genre, plot, cast } = req.body
//     const { movies_id } = req.params

//     Movies
//         .findByIdAndUpdate(movies_id, { title, genre, plot, cast })
//         .then(() =>

//             res.redirect('/movies')

//         )
//         .catch(err => console.log(err))
// })

router.post("/:_id/edit", (req, res, next) => {
    const { title, genre, plot, cast } = req.body
    let movies_id = req.params.id
    Movies.findByIdAndUpdate(movies_id, { title, genre, plot, cast },{ new: true })
        .then(movies => {
            res.redirect(`/movies/${movies._id}`)
        })
        .catch(err => next(err))

})


module.exports = router;