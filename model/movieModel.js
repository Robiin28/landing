const mongoose = require('mongoose');
const fs = require('fs');
const validator = require('validator');
const movieSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "name is required"],
        unique: true,
        trim: true, // ensures no white space before and after movie name
        // validate: [ validator.isAlpha, "name must be un alphabet"]
    },
    description: {
        type: String,
        required: [true, "description is a required field"]
    },
    director: {
        type: [String],
        required: [true, "director is required"]
    },
    year: {
        type: Number,
        required: [true, "year is required"]
    },
    duration: {
        type: Number,
        required: [true, "duration is a required field"],
        default: 100
    },
    totalRating: {
        type: Number,
    },
    rating: {
        type: Number,
        default: 2.0,
        validate: {
            validator: function (value) {
                return value >= 1 && value <= 10;
            },
        message: `rating ({VALUE})  should be between 1 and 10`
        }
    },
    releaseDate: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    genres: {
        type: [String],
        required: [true, "genres is required"]
    },
    coverImage: {
        type: String,
        required: [true, "cover image is required"]
    },
    actors: {
        type: [String],
        required: [true, "actors are required"]
    },
    price: {
        type: Number,
        required: [true, "price is required"]
    },
    createdBy: {
        type: String
    }
},{
    toJSON: {virtuals: true },
    toObject: { virtuals: true }
});
//correct syntax but saying unknown word
movieSchema.virtual('durationInHours').get(function () {
    return this.duration / 60;
});
movieSchema.pre('save', function (next) {
    this.createdBy = 'robi';
    next();
});

movieSchema.post('save', function (doc, next) {
    const content = `a new movie document with name ${doc.name} has bn created by ${doc.createdBy}\n`;
    fs.writeFileSync('./log/log.txt', content,{flag: 'a' }, (err) => {
        console.log(err.message);
    });
    next();

});
movieSchema.pre(/^find/, function (next) {
    this.find({ releaseDate: { $lte: Date.now() } });
    this.startTime = Date.now();
    next();
});

movieSchema.post(/^find/, function (docs,next) {
    this.find({ releaseDate: { $lte: Date.now() } });
    this.endTime = Date.now();
const content=`Query took ${this.endTime-this.startTime} millisecond to fetch query `

     fs.writeFileSync('./log/log.txt', content,{flag: 'a' }, (err) => {
        console.log(err.message);
    });
    next();
});
movieSchema.pre('aggregate', function (next){
    this.pipeline().unshift({ $match: { releaseDate: { $lte: new Date() } } })
    next();
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
