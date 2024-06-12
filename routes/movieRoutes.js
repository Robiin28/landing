
const express=require('express');
const controller = require('./../controller/controllers');
const authController = require('./../controller/authController');

const route=express.Router();

//parametrized middle ware

// route.param('id',controller.checkId);


route.route('/')
    .get(
        authController.protect,
        controller.getMovies
    )
//route handler function are
// middleware like getMovie is function it is also middle ware
.post(controller.postMovie)
// middle ware can be channed , like post need to check if it is valid input 
route.route('/movie-stats')
.get(controller.getMovieStats)
route.route('/movie-genre/:genre')
.get(controller.getMovieByGenre)
route.route('/:id')
.get(controller.searchMovie)

.patch(controller.updateMovie)
    .delete(
        authController.protect,
        authController.restrict("admin"),
        controller.deleteMovie)

module.exports = route;