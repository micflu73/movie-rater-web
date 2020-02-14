import React, { Component } from 'react';
import './App.css';
import MovieList from './components/movie-list';

class App extends Component {

  state = {
    movies: []
  }

  componentDidMount() {
    // fetch data when App is mounted
    fetch('http://localhost:8000/api/movies/', {
      method: 'GET',
      headers: {
        'Authorization': 'Token 86fc7a6fe9f8564a562ada960cf751af1fcace11'
      }
    }).then( resp => resp.json())
      //.then( res => console.log(res))
      .then( res => this.setState({movies: res}))
      .catch( error => console.log(error))
  }

  render() {
    return (
      <div className="App">
        <h1>Movie Rater</h1>
        <MovieList movies={this.state.movies} />
      </div>
    );

  }

}

export default App;
