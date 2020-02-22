import React, { Component } from 'react';

// display movie details
class MovieForm extends Component {

    state = {
        editedMovie: this.props.movie
    }

    cancelClicked = () => {
        this.props.cancelForm();
    }

    inputChanged = event => {
        let movie = this.state.editedMovie;
        movie[event.target.name] = event.target.value;
        this.setState({editedMovie: movie});
    }

    saveClicked = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token 86fc7a6fe9f8564a562ada960cf751af1fcace11'
            },
            body: JSON.stringify(this.state.editedMovie)
            }).then( resp => resp.json())
            .then( res => this.props.newMovie(res))
            .catch( error => console.log(error))
    }

    updateClicked = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/${this.props.movie.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token 86fc7a6fe9f8564a562ada960cf751af1fcace11'
            },
            body: JSON.stringify(this.state.editedMovie)
            }).then( resp => resp.json())
            .then( res => this.props.editedMovie(res))
            .catch( error => console.log(error))
    }

    render() {

        const isDisabled = this.state.editedMovie.title.length === 0 ||
                            this.state.editedMovie.description.length === 0;

        return (
            <React.Fragment> 
                <h1>Form</h1>
                <span>Title</span><br />
                <input type="text" name="title"
                    value={this.props.movie.title} 
                    onChange={this.inputChanged} /><br />
                <span>Description</span><br />
                <textarea name="description"
                    value={this.props.movie.description}
                    onChange={this.inputChanged} /><br />
                { !this.props.movie.id ? 
                    <button disabled={isDisabled} onClick={this.saveClicked} >Save</button> :
                    <button disabled={isDisabled} onClick={this.updateClicked} >Update</button> }
                <button onClick={this.cancelClicked} >Cancel</button>
            </React.Fragment>
        )
    }
}

export default MovieForm;