const express  = require('express');
const cors =  require('cors');
const { uuid } =  require('uuidv4')

const app = express();


app.use(express.json());

app.use(cors());

const repositories = [];

app.get('/', (request, response) => {

});

app.post('/', (request, response) => {

});

app.put('/', (request, response) => {

});

app.delete('/', (request, response) => {

});

module.exports = app;

