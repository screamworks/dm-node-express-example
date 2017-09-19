
const express = require('express');
const bodyParser = require('body-parser');

const port = 3000;


const pokemon = [
    {
        name: 'Pikachu',
        number: 25
    }, {
        name: 'Bulbasaur',
        number: 1
    }, {
        name: 'Ivy',
        number: 2
    }
]

const app = express();

app.use(bodyParser.json());

app.get('/api/pokemon', function(req, res, next) {
    res.json(pokemon);
});

app.post('/api/pokemon', (req, res, next) => {
    if(!req.body.name){
      res.status(418).json({err: 'Name Required'});
    } else {
    pokemon.push(req.body);
    res.json(pokemon);
  }
});


app.listen(port, () => {
    console.log(`Listening on Port: ${port}`);
});

app.delete('/api/pokemon', (req, res, next) => {
  res.json(pokemon.pop());
})
