// Description: This file contains the server code for the project. 
// It is the entry point for the project.
const backproptfRouter = require('./app/routes/backproptf.server.routes.js');
const express = require('express')
const app = express()
//
app.use('/', backproptfRouter);
// Set the application view engine and 'views' folder
app.set('views', './app/views');
app.set('view engine', 'ejs');
// Start the server
app.listen(5000);

console.log('Server running at http://localhost:5000/');



//
