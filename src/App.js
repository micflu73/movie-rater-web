import React, { Component } from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';

class App extends Component {

  state = {
    movies: [],
    selectedMovie: null,
    editedMovie: null
  }

  componentDidMount() {
    // fetch data when App is mounted
    fetch(`${process.env.REACT_APP_API_URL}/api/movies/`, {
      method: 'GET',
      headers: {
        'Authorization': 'Token 86fc7a6fe9f8564a562ada960cf751af1fcace11'
      }
    }).then( resp => resp.json())
      //.then( res => console.log(res))
      .then( res => this.setState({movies: res}))
      .catch( error => console.log(error))
  }

  loadMovie = movie => {
    this.setState({selectedMovie: movie});
    this.setState({editedMovie: null});
  }

  movieDeleted = selMovie => {
    const movies = this.state.movies.filter( movie => movie.id !== selMovie.id);
    this.setState({movies: movies, selectedMovie: null});
  }

  editClicked = selMovie => {
    this.setState({editedMovie: selMovie});
  }

  newMovie = () => {
    this.setState({editedMovie: {title: '', description: ''}});
  }

  cancelForm = () => {
    this.setState({editedMovie: null});
  }

  addMovie = movie => {
    this.setState({movies: [...this.state.movies, movie]});
  }


  render() {
    return (
      <div className="App">
        <h1>Movie Rater</h1>
        <div className="layout">
          <MovieList movies={this.state.movies} movieClicked={this.loadMovie} 
            movieDeleted={this.movieDeleted} editClicked={this.editClicked} 
            newMovie={this.newMovie} />
          <div>
            { !this.state.editedMovie ? 
              <MovieDetails movie={this.state.selectedMovie} updateMovie={this.loadMovie} />
              : <MovieForm movie={this.state.editedMovie} cancelForm={this.cancelForm} 
                  newMovie={this.addMovie} editedMovie={this.loadMovie} />
            }
          </div>
        </div>
      </div>
    );

  }

}

export default App;
