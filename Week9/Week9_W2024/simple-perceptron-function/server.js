const express = require('express');
const perceptronRoute = require('./app/routes/perceptron.server.routes');
//
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

// Bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use the perceptron route
app.use('/', perceptronRoute);

// Set the application view engine and 'views' folder
app.set('views', './app/views');
app.set('view engine', 'ejs');

// Start the server on the port 5000
app.listen(PORT, () => console.log('Server started on port http://localhost:5000'));