import React from 'react';
import { Movies } from './movies';
import axios from 'axios';

export class Read extends React.Component {

    constructor(){
        super();
        this.ReloadData = this.ReloadData.bind(this);
    }

    state = {
        movies: []
    };

    ReloadData(){
        axios.get('http://localhost:4000/api/movies')//asynchronous by using a promise //now gets data from new api
            .then((response) => {
                this.setState({ movies: response.data })//data coming back as from the response of the web server
            })//response method
            .catch((error) => {
                console.log(error)//logs error to console
            });//if things dont work catch method
    }

    componentDidMount() {//component lifecycle hooks - when visiable to web api method will be exceuted
        axios.get('http://localhost:4000/api/movies')//asynchronous by using a promise //now gets data from new api
            .then((response) => {
                this.setState({ movies: response.data })//data coming back as from the response of the web server
            })//response method
            .catch((error) => {
                console.log(error)//logs error to console
            });//if things dont work catch method
    }

    render() {
        return (
            <div>
                <h1>This is the read component.</h1>
                <Movies movies={this.state.movies} ReloadData={this.ReloadData}></Movies>
            </div>
        );
    }
}

