const express = require('express');
const app = express();
const port = 3001;

const cors = require('cors')
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  });
app.use(cors());

const serviceDictionary = {
  services: [
    {
      name: 'Product Microservice',
      endpoints: [
        {
          name: 'GetProducts',
          url: 'http://localhost:3002/products',
          method: 'GET',
        },
      ],
    },
    {
      name: 'User Authentication Microservice',
      endpoints: [
        {
          name: 'Login',
          url: 'http://localhost:3003/auth/login',
          method: 'POST',
        },
      ],
    },
  ],
};

app.get('/service-dictionary', (req, res) => {
  res.json(serviceDictionary);
});

app.listen(port, () => {
  console.log(`Service Dictionary listening on port ${port}`);
});
