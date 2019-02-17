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

//GET	/api/users	Returns an array of all the user objects contained in the database.

//GET:
server.get('/api/users', (req, res ) => {
    db.find()
    .then(users => {
        res.status(200).json({ success: true, users});
    })//headers
    .catch(err => {
        res.status(500).json({ success: false, message: 'The users information could not be retrieved.'})
    })
})

// When the client makes a GET request to /api/users/:id:

// If the user with the specified id is not found:

// return HTTP status code 404 (Not Found).
// return the following JSON object: { message: "The user with the specified ID does not exist." }.
// If there's an error in retrieving the user from the database:

// cancel the request.
// respond with HTTP status code 500.
// return the following JSON object: { error: }."The user information could not be retrieved." 

//GET	/api/users/:id	Returns the user object with the specified id.

server.get('/api/users/:id', ( req, res ) => {
    const { id } = req.params;

    db.findById(id)
    .then(user => {
        if (user) {
            res.status(201).json({ success: true, user });
        }else{
            res.status(404).json({ success: false, message: 'The user with the specified ID does not exist.'})
        }
    })
    .catch(err => {
        res.status(500).json({ success: false, error: 'The user information could not be retrieved.'})

        })
    })


// When the client makes a POST request to /api/users:

// If the request body is missing the name or bio property: cancel the request. 
// Respond with HTTP status code 400 (Bad Request).

// Return the following JSON response: { errorMessage: "Please provide name and bio for the user." }.

// If the information about the user is valid:
// save the new user the the database.
// return HTTP status code 201 (Created).
// return the newly created user document.

// If there's an error while saving the user: cancel the request.
// respond with HTTP status code 500 (Server Error).
// return the following JSON object: { error: "There was an error while saving the user to the database" }

//POST	/api/users	Creates a user using the information sent inside the request body.

server.post('/api/users', ( req, res ) => {
    const { name, bio } = req.body;
    if ( !name && !bio ) {
        res.status(400).json({ error: 'Please provide name and bio for the user.' });
    }else{
        db
        .insert({ name, bio })
        .then(user => {
            res.status(201).json( user );
        })
        .catch(err => {
            res.status(500).json({ error: 'There was an error while saving the user to the database' })
        })
    }
})

// When the client makes a DELETE request to /api/users/:id:

// If the user with the specified id is not found:
//return HTTP status code 404 (Not Found).
// return the following JSON object: { message: "The user with the specified ID does not exist." }.

// If there's an error in removing the user from the database: cancel the request & respond with HTTP status code 500.
// return the following JSON object: { error: "The user could not be removed" }.

//DELETE	/api/users/:id	Removes the user with the specified id and returns the deleted user

server.delete('/api/users/:id', ( req, res ) => {
    const { id } =req.params;
    db
    .remove(id)
    .then(user => {
        if( user ){
            res.status(204).end();
        }else{
            res.status(404).json({ success: false,  message:'The user with the specified ID does not exist.' })
        }
    })
    .catch(err => {
        res.status(500).json({ error: 'The user could not be removed' })
    })
})
    








server.listen(4000, () => {
    console.log('\n*** Running on port 4000 ***\n');
})