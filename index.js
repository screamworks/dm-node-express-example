const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const config = require('./config');
// app declaration
const app = express();

// middleware
app.use(bodyParser.json());

// const options = {
//     origin: 'http://localhost:8080'
// }


app.use(cors());

app.use(express.static(__dirname + '/public/'));

app.use(session({
    secret,
    saveUninitialized: true,
    resave: true
}));

app.use(logger((token, req, res) => {
    console.log('BODY: ', req.body);
    console.log('QUERY: ', req.query);
    console.log('PARAMS: ',  req.params);
    console.log('HEADERS: ', req.headers);
    console.log('SESSION: ', req.session);
}));

// controllers
const winnersCtrl = require('./controllers/winnersCtrl');
const losersCtrl = require('./controllers/losersCtrl');

// endpoints
app.get('/api/teams', isAuthed, winnersCtrl.getTeams);
app.get('/api/team/:id', winnersCtrl.getOneTeam);
app.get('/api/getLosers', isAuthed, losersCtrl.getLosers);
app.get('/api/getAllTeams', winnersCtrl.getAllTeams);


app.post('/api/teams', winnersCtrl.addTeam);

app.put('/api/team', winnersCtrl.deleteTeam);

app.delete('/api/team/:id', winnersCtrl.deleteTeam);

app.get('/api/bracket', (req, res, next) => {
    res.json(req.session.bracket);
});

app.post('/api/bracket', (req, res, next) => {
    if (!req.session.bracket) req.session.bracket = [];
    req.session.bracket.push(req.body);
    res.json(req.session.bracket);
});

function isAuthed(req, res, next) {
    if (true) {
        res.status(403).json('NOT AUTHORIZED');
        return;
    } else if (false) {
        console.log('He good');
        next();
    }
}

// listen function
app.listen(3000, function() {
    console.log('Listening on port 3000');
});
