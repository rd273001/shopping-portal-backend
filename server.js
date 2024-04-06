const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// connecting to MongoDB
mongoose.connect( process.env.MONGODB_URI )
  .then( () => console.log( 'Successfully Connected to MongoDB...' ) )
  .catch( ( error ) => console.error( 'Error connecting to MongoDB:', error.message ) );

// middleware
app.use( express.json() ); // parse incoming requests data as JSON

// error handling middleware
app.use( ( err, req, res, next ) => {
  console.error( err.stack );
  res.status( 500 ).json( { message: 'Internal server error' } );
} );

const PORT = process.env.PORT || 3000;
app.listen( PORT, () => {
  console.log( `Server is running on port ${ PORT }` );
} );