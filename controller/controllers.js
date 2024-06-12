const express = require('express');
const mongoose = require('mongoose');
const movie = require('./../model/movieModel');
const ApiFeature = require('./../Utils/ApiFeature');
const asyncErrorHandler = require('./../Utils/asyncErrorHandler');
const CustomErr = require('../Utils/CustomErr');

// const fs=require('fs');
// let movies=JSON.parse(fs.readFileSync('./data/movies.json'));
// exports.checkId=(req,res,next,value) =>{
// // console.log('Movie Id is' +value);

// let movie = movies.find(el => el.id === value*1)
// if(!movie){
//     return res.status(404).json({
//         status: "not found",
//        message:'Movie with id'+value+' is not found'
//     });

// }
// next();
// }

//general globalErrorHandler



// *** routing functions **//
// ***  1 ****//
module.exports.getMovies = asyncErrorHandler(async (req, res,next) => {
 
    
    // ****
    // ****  2 ****//
    // try {
    
        const apiFeature = new ApiFeature(movie.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        const movies = await apiFeature.query;

        // const exclude = ['sort', 'page', 'limit', 'fields'];
        // const queryObj = {...(req.query)};
        // exclude.forEach((el) => {
        //     delete queryObj(el);
        // })


        //advanced filtering
        // let queryStr = JSON.stringify(req.query);
        // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        // const queryObj = JSON.parse(queryStr);

        //         console.log(queryObj);

        //         let query = movie.find(queryObj);
       
        
        //    if (req.query.sort) {
        // const sortBy = req.query.sort.split(',').join(' '); // Join the sorting fields with space
        //        query = query.sort(sortBy);
        //     //    console.log(query);
        //     }
        //     if (req.query.fields) {
        //         const fields = req.query.fields.split(',').join(' ');
        //         query = query.select(fields);
        //     }

        // const movies = await query;
       
        // console.log(movies);

        // .where('duration').equals(req.query.duration)
        // .where('rating').equals(req.query.rating)
        res.status(200).json({
            status: 'success',
            length: movies.length,
            data: {
                movies: movies
            }
        })
    }
    // catch (err) {
    //     res.status(404).json({
    //         status: 'fail',
    //         message: err.message
    //     })
    // }
// }
);
module.exports.getMovieStats = asyncErrorHandler(async (req, res,next) => {
    // try {
       
    //aggregation pipeline the result of one input is the input for the next criteria
    //separated by , between {}
    const stats = await movie.aggregate([
        { $match: { rating: { $gte: 2 } } },
        {
            $group: {
                _id: '$year',
                avgRating: { $avg: '$rating' },
                avgPrice: { $avg: '$price' },
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' },
                priceTotal: { $sum: '$price' },
                movieCount: { $sum: 1 }
            }
        },
        { $sort: { minPrice: 1 } }
    ]);

    res.status(200).json({
        status: 'success',
        length: stats.length,
        data: {
            stats
        }
    })
    // }
    // catch (err) {
    //     res.status(400).json({
    //         status: 'fail',
    //         message:err.message
    //     })
    //     console.log(err);
    // }
});
module.exports.getMovieByGenre = asyncErrorHandler(async (req, res,next) => {
    // try {
        
    const genre = req.params.genre;
    const mov = await movie.aggregate([
        { $unwind: '$genres' },
        {
            $group: {
                _id: "$genres",
                movieCount: { $sum: 1 },
                mov: { $push: '$name' }
            }
        },
        { $addFields: { genre: "$_id" } },
        { $project: { _id: 0 } },
        //to make id hidden giv value 0, or to be shown 1
        { $sort: { movieCount: -1 } },
        { $match: { genre: genre } }
    ]);
    res.status(200).json({
        status: 'success',
        length: mov.length,
        data: {
            mov
        }
    });
    // }
    // catch (err) {

    // res.status(400).json({
    //         status: 'fail',
    //         message:err.message
    //     })
    //     console.log(err);

    // }

});


module.exports.postMovie = asyncErrorHandler(async (req, res,next) => {
    // console.log(req.body);
    // const newId=movies[movies.length - 1].id + 1;
    // //now need to( (merge) join with added movie item
    // const newMovie=Object.assign({id: newId}, req.body);
    // movies.push(newMovie);
    // //write async  in json filter: 
    // fs.writeFile('./data/movies.json', JSON.stringify(movies),(err) =>{
    //     res.status(201).json(
    //       {
    //         status: "success",
    //         data: {
    //             movie:newMovie
    //         }
    //     })

    // })
    // res.send('created');
    //**db */
    // 1 way to crate movie  
    // const testMovie = new movie({})
    // testMovie.save();
    //2 way
    // try {
    const mov = await movie.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            movie: mov
        }
    })
    // }
    // catch (err)
    // {
    //     res.status(400).json({
    //         status: 'fail',
    //         message:err.message
    //     })
    //     console.log(err);
    // }

});
// *****

// ***** 3 *******//
module.exports.searchMovie = asyncErrorHandler(async (req, res,next) => {
    // converting string to int id
    //     const id = req.params.id * 1;
    //     let movie = movies.find(el => el.id === id)
    // // if(!movie){
    // //     return res.status(404).json({
    // //         status: "not found",
    // //        message:'Movie with id'+id+' is not found'
    // //     });

    // // }
    // res.status(200).json({
    //     status: "success",
    //     data: {
    //         movie: movie
    //     }
    // });

    // ******
    // const mov = await movie.find({ _id: req.params.id });
    //similar to
    // try {
    const mov = await movie.findById(req.params.id);
    if (!mov) {
            const err = new CustomErr("movie not found with that id", 404);
            return next(err);
    }
    res.status(200).json({
        status: "success",
        data: {
            movie: mov
        }
    });
    // }
    // catch (err) {
    //     res.status(400).json({
    //         status: 'fail',
    //         message: err.message
    //     })
    //     console.log(err);
    // }
});
// ****** 4 ******//
module.exports.updateMovie = asyncErrorHandler(async (req, res,next) => {
    // let id = req.params.id * 1;
    // let movieTo = movies.find(el => el.id === id);
    // try {
    const mov = await movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      
    if (!mov) {
            const err = new CustomErr("movie not found with that id", 404);
            return next(err);
    }
    
    
    res.status(200).json({
        status: "success",
        data: {
            movie: mov
        }
    });
    // }
    //   catch (err) {
    //     res.status(400).json({
    //         status: 'fail',
    //         message: err.message
    //     })
    //     console.log(err);
    // }

    // let index = movies.indexOf(movieTo);




    // if(!movieTo){
    //     return res.status(404).json(
    //         {
    //             status:'fail',
    //             message:'no movie to update'
    //         }
    //     )
    // }
    // Object.assign(movieTo, req.body);
    // movies[index] = movieTo;

    // fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
    //     res.status(200).json({
    //         status: "success",
    //         data: {
    //             movie: movieTo
    //         }
    //     });
    // });
});

//****validating body  */
// module.exports.validateMovie=(req,res,next)=>{
// if(!req.body.name || !req.body.year){
//     return res.status(404).json({
//        status:"error invalid request",
//        message:"Invalid input "

//     })
// }
// next()
// }



/*** */
// *****
// ******* 5 *********//
module.exports.deleteMovie = asyncErrorHandler(async (req, res,next) => {

    // const id=req.params.id *1;
    // const movieTo=movies.find(el => el.id === id);
    // const index= movies.indexOf(movieTo);
    
    // movies.splice(index,1);
    // // if(!movieTo){
    // //     return res.status(404).json(
    // //         {
    // //             status:'fail',
    // //             message:'no movie to update'
    // //         }
    // //     )
    // // }
    // fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
    //     res.status(204).json({
    //         status: "success",
    //         data: {
    //             movie: null
    //         }
    //     });
    // });

    //****db */


    // try {
    const mov = await movie.findByIdAndDelete(req.params.id);
    
      if (!mov) {
            const error = new CustomErr("movie not found with that id", 404);
            return next(error);
    }
    
    res.status(204).json({
        status: "success",
        message: "successfully deleted"
    });
    // }
    // catch (err) {
    //          res.status(400).json({
    //         status: 'fail',
    //         message: err.message
    //     })
    //     console.log(err);
    // }
});