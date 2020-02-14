import React from 'react';

// display list of movies
function MovieList(props) {

    return (
        <React.Fragment>
            { props.movies.map( movie => {
                return <h3>{movie}</h3>
            })}
        </React.Fragment>
    )
}

export default MovieList;