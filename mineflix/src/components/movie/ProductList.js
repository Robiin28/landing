
import React from 'react';
import Movie from './Movie'


const ProductList = (props) => {
return (props.newMovie===0?<h3>No movie found!!!</h3>:

        <div>
            {props.newMovie.map((movie) => (
                <Movie
                    key={movie?.id}
                    id={movie?.id}
                    name={movie?.name}
                    description={movie?.description}
                    imageUrl={movie?.image}
                    price={movie?.price}
                    rating={movie?.ratings}
                    active={movie?.active}
                    totalRating={movie?.totalRating}
                    year={movie?.year}
                    duration={movie?.duration}
                    genres={movie?.genres}
                    actors={movie?.actors}
                />
            ))}
        </div>
    );
};
export default ProductList;