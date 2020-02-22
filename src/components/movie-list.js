import React from 'react';
var FontAwesome = require('react-fontawesome');

// display list of movies
function MovieList(props) {

    const movieClicked = movie => evt => {
        props.movieClicked(movie);
    }

    const editClicked = movie => {
        props.editClicked(movie);
    }

    const removeClicked = movie => {
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/${movie.id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token 86fc7a6fe9f8564a562ada960cf751af1fcace11'
            }
            }).then( resp => props.movieDeleted(movie))
            .catch( error => console.log(error));
    }

    const newMovie = () => {
        props.newMovie();
    }

    return (
        <div>
            { props.movies.map( movie => {
                    return ( 
                        <div key={movie.id} className="movie-item" >
                            <h3 key={movie.id} onClick={movieClicked(movie)} >
                                {movie.title}
                            </h3>
                            <FontAwesome name="edit" onClick={() => editClicked(movie)}/>
                            <FontAwesome name="trash" onClick={() => removeClicked(movie)}/>
                        </div>

                    )                
                })
            }
            <button onClick={newMovie}>Add Movie</button>
        </div>
    )
}

export default MovieList;