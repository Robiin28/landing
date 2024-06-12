const express= require('express');
const fs=require('fs');
const morgan = require('morgan');
const authRouter = require('./routes/authRouter');
const movieRouter = require('./routes/movieRoutes');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const hpp = require('hpp');
const xxs=require('xss-clean');
const sanitize = require('express-mongo-sanitize');
const userRouter = require('./routes/userRouter');
const CustomErr = require('./Utils/CustomErr');
const globalErrorHandler = require('./controller/errController');


//middle ware


app = express();

app.use(helmet());


let limiter = rateLimit({
    max: 1000,
    windowMS: 3600000,
    message: "we have received to many request from this ip"
});

app.use('/api', limiter);



app.use(express.json({
limit:'10kb'
}));
app.use(sanitize());
//any malicious user input will be cleaned and changed 
app.use(xxs());
app.use(hpp({
    whitelist:[
        'duration',
        'ratings',
        'releaseYear',
        'releaseDate'
    ]
}));
 
app.use(morgan('dev')); 
//between body of requested need middle ware

//need middleware to make app oject public for static css and html
app.use(express.static('./public'));


/****** another middleware *****/
app.use((req,res,next) => {

    req.requestedAt=new Date().toISOString();
    next();
})



// ********

// api get methods


// ***********************
// app.get('/api/v1/movies',getMovies);
// app.post('/api/v1/movies',postMovie);
// app.get('/api/v1/movies/:id', searchMovie);
// app.patch('/api/v1/movies/:id',updateMovie);
// app.delete('/api/v1/movies/:id',deleteMovie);
// **********************************



//mounting router mean creating route other that app



//need to clear the router  to app
app.use('/api/v1/movies', movieRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user',userRouter);
app.all('*', (req, res, next) => {
    // res.status(404).json({
    //     status: 'fail',
    //     message:`can,t find ${req.originalUrl} on the server `
    // })

    // const err = new Error(`can,t find ${req.originalUrl} on the server `);
    // err.status = "fail";
    // err.statusCode = 404;
    // next(err);


    const err = new CustomErr(`can,t find ${req.originalUrl} on the server `, 404);
//need argument to call global handling middle ware
    next(err);
})

//global error handling middleware 
app.use(globalErrorHandler);

module.exports = app;