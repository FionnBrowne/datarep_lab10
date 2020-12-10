import React from 'react';
import axios from 'axios';

export class Edit extends React.Component {//displayed by app.js

    constructor() {
        super();

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.onChangePoster = this.onChangePoster.bind(this);

        this.state = {
            Title: '',
            Year: '',
            Poster: ''
        }
    }

    componentDidMount(){
        console.log("load "+this.props.match.params.id);//logs id to console

        axios.get('http://localhost:4000/api/movies/'+this.props.match.params.id)//asynchronious call to server
        .then((response)=>{
            this.setState({
                Title:response.data.Title,//lower case on the server
                Year:response.data.Year,
                Poster:response.data.Poster,
                _id:response.data._id
            })//this will invoke get request in server.js
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    onChangeTitle(e) {
        this.setState({
            Title: e.target.value
        });
    }

    onChangeYear(e) {
        this.setState({
            Year: e.target.value
        });
    }
    onChangePoster(e) {
        this.setState({
            Poster: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();//prevent from being called multiple times
        alert("Movie: " + this.state.Title + " "
            + this.state.Year + " " +
            this.state.Poster);

            const newMovie ={
                Title:this.state.Title,
                Year:this.state.Year,
                Poster:this.state.Poster
            };//passing objects up as lowercase because server.js is looking for them in that case


        // axios.post('http://localhost:4000/api/movies', newMovie)
        // .then(response => console.log(response.data))
        // .catch(error => console.log(error));    
            axios.put('http://localhost:4000/api/movies/'+this.state._id, newMovie)
            .then((xyz)=>{
                console.log(xyz);
            })
            .catch((err)=>{
                console.log(err);
            });
    }

    render() {
        return (
            <div className='App'>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Add Movie Title: </label>
                        <input type='text'
                            className='form-control'
                            value={this.state.Title}
                            onChange={this.onChangeTitle}></input>
                    </div>
                    <div className="form-group">
                        <label>Add Movie Year: </label>
                        <input type='text'
                            className='form-control'
                            value={this.state.Year}
                            onChange={this.onChangeYear}></input>
                    </div>
                    <div className='form-group'>
                        <label>Movies Poster: </label>
                        <textarea type='text'
                            className='form-control'
                            value={this.state.Poster}
                            onChange={this.onChangePoster}>
                        </textarea>
                    </div>


                    <div className="form-group">
                        <input type='submit'
                            value='Edit Movie'
                            className='btn btn-primary'></input>
                    </div>
                </form>
            </div>
        );
    }
}