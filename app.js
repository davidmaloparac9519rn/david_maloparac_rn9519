const express = require('express');
const { sequelize } = require('./models');
const users = require('./routes/users');
const stations = require('./routes/stations');
const trains = require('./routes/trains');
const rides = require('./routes/rides');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

app.use('/admin', users, stations, trains, rides);

function getCookies(req) {
    if (req.headers.cookie == null) { 
        return {};
    }

    const rawCookies = req.headers.cookie.split('; ');
    const parsedCookies = {};

    rawCookies.forEach( rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });

    return parsedCookies;
};

function authToken(req, res, next) {
    // if (req.path == '/login' || req.path == '/register') {
    //     return next();
    // }

    const cookies = getCookies(req);
    const token = cookies['token'];
  
    if (token == null) { 
        return res.redirect(301, '/login');
    }
  
    jwt.verify(token, 'secret_token', (err, user) => {
        if (err) {
             return res.redirect(301, '/login');
        }
        
        req.user = user; 

        // samo admin sme da pristupi userima
        if (req.path == '/users' && req.user.type != 'admin') {
            return res.redirect(301, '/login');
        }
        // obicni user ne moze da pristupi ovim rutama
        if ((req.path == '/trains' || req.path == '/stations' || req.path == '/rides') && req.user.type == 'standard') {
            return res.redirect(301, '/login');
        }

        next();
    });
}

// app.all('*', authToken);

app.get('/register', (req, res) => {
    res.sendFile('register.html', { root: './static' });
});

app.get('/login', (req, res) => {
    res.sendFile('login.html', { root: './static' });
});

app.get('/', authToken, (req, res) => {
    res.sendFile('index.html', { root: './static' });
});

app.get('/users', authToken, (req, res) => {
    res.sendFile('users.html', { root: './static' });
});

app.use(express.static(path.join(__dirname, 'static')));

app.listen({ port: 8000 }, async () => {
    await sequelize.authenticate();
});
