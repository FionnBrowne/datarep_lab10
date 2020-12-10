//have to install cored on the server. first stop program running
const express = require('express')
const app = express()
const port = 4000//so it wont collide with other local server
const cors = require('cors');//including cors
const bodyParser = require('body-parser');//allows to intercept body of a http message
const mongoose = require('mongoose');
const path = require('path');


app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(path.join(__dirname, '../build')))
app.use('/static', express.static(path.join(__dirname, 'build//static')))//lines pointing to static folder

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
//replace password and put in database name
const strConnection = 'mongodb+srv://admin:admin@cluster0.r2xtn.mongodb.net/movies?retryWrites=true&w=majority';
mongoose.connect(strConnection, { useNewUrlParser: true });

const Schema = mongoose.Schema;
const movieSchema = new Schema({
    Title: String,
    Year: String,
    Poster: String
})

const movieModel = mongoose.model('film', movieSchema);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/movies', (req, res) => {
    //find all documents in database
    movieModel.find((err, data) => {
        res.json(data);
    })
    //         "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
    //         "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"

})

app.get('/api/movies/:id', (req, res) => {

    console.log(req.params.id);

    movieModel.findById(req.params.id, (err, data) => {
        //if data found send it back
        res.json(data);
    })//send back the data
})

app.put('/api/movies/:id', (req, res) => {//interact with database// then update entire document in 3 fields
    console.log("Update " + req.params.id);//logs to console

    movieModel.findByIdAndUpdate(req.params.id,
        req.body,
        (err, data) => {
            res.status(201).send(data);//if data found send it back
        })
})
//listen for http request to delete
app.delete('/api/movies/:id', (req, res) => {//gets id from url
    console.log(req.params.id);
    //interact with movie model find id and then delete
    movieModel.findByIdAndDelete({ _id: req.params.id },//matches id get passed ups
        (err, data) => {
            res.send(data);
        })
})


app.post('/api/movies', (req, res) => {//method loads data from the server using a HTTP POST request.
    console.log(req.body);

    movieModel.create({
        Title: req.body.Title,
        Year: req.body.Year,
        Poster: req.body.Poster
    })
        .then()
        .catch();

    res.send('Data Recieved!');
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../build/index.html'));
})//using star to send index.html files back 

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})