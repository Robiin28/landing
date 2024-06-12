import React from 'react';

const MovieDetails=(props)=> {
  return (
    <div className="movie-details">
      <p>Total Rating: {props.totalRating}</p>
      <p>Year: {props.year}</p>
      <p>Duration: {props.duration} minutes</p>
      {/* <p>Genres: {props.genres.join(', ')}</p>
      <p>Actors: {props.actors.join(', ')}</p> */}
    </div>
  );
}

export default MovieDetails;
