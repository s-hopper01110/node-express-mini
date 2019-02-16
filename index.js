// implement your API here
//like import express from express
const express = require('express');

//pulls in db.js file
const db = require('./data/db.js');


const server = express();

//middleware
server.use(express.json());




//route handler ( GET ) 
server.get('/', (req, res) => {
    res.send('express project -- success')
})

// //When the client makes a GET request to /api/users:

// If there's an error in retrieving the users from the database:
// cancel the request.
// respond with HTTP status code 500.
// return the following JSON object: { error: "The users information could not be retrieved." }.//

server.get('/api/users', (req, res ) => {
    db.find()
    .then(users => {
        res.status(200).json({ success: true, users })//headers
    .catch(err => {
        res.status(500).json({ success: false, message: 'The users information could not be retrieved.'
    })
}

    




// When the client makes a GET request to /api/users/:id:

// If the user with the specified id is not found:

// return HTTP status code 404 (Not Found).
// return the following JSON object: { message: "The user with the specified ID does not exist." }.
// If there's an error in retrieving the user from the database:

// cancel the request.
// respond with HTTP status code 500.
// return the following JSON object: { error: "The user information could not be retrieved." }.





server.listen(4000, () => {
    console.log('\n*** Running on port 4000 ***\n');
})