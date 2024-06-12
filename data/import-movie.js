

const mongoose = require('mongoose');
const dotenv = require('dotenv');
   dotenv.config({ path: './config.env' });
const fs = require('fs');
const Movie = require('./../model/movieModel');
mongoose.connect(process.env.CONN_STR, {
    // useNewUrlParser: true
}).then((conn) => {
    console.log(conn);
    console.log('DB connection Successful');
}).catch((err) => {
    console.log("some error happen");
})


const movies = JSON.parse(fs.readFileSync('./data/movies.json', 'utf8'));
const deleteMovie = async () => {
    try {
        
        await Movie.deleteMany().maxTimeMS(60000);

        console.log("Data successfully deleted");
    }
    catch (err) {
        console.log(err.message);
    }
    process.exit();
}
const importMovies = async () => {
    try {
          await Movie.create(movies);
          console.log("movie imported successfully");
    }
    catch (err) {
        console.log(err.message);
    }
     process.exit();s
}
//  importMovies();
if (process.argv[2] === '--import') {
    importMovies();
}
else if(process.argv[2] === '--delete')
{
    deleteMovie();
}
else {
    console.log("Invalid command. Use '--import' to import movies or '--delete' to delete all movies.");
    process.exit(); // Exiting the process if an invalid command is provided
}
//node data/import-movie.js --import