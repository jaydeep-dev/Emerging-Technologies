// microservice-auth.js
const express = require('express');
const app = express();
const port = 3003;

app.post('/auth/login', (req, res) => {
  res.send('User authenticated');
});

app.listen(port, () => {
  console.log(`User Authentication Microservice listening on port ${port}`);
});
