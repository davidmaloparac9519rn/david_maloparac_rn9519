const express = require('express');
const { sequelize, User } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const Joi = require('joi');
const cookieParser = require('cookie-parser');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const app = express();

// var corsOptions = {
//     origin: 'http://127.0.0.1:8000',
//     optionsSuccessStatus: 200
// }

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.post('/register',
    body('email').isEmail(),
    body('name').isLength({ min: 1 }),
    body('password').isLength({ min:4 }),
    (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const obj = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        type: req.body.type
    };
    User.create(obj).then( rows => {
        const usr = {
            userId: rows.id,
            user: rows.name
        };

        const token = jwt.sign(usr, 'secret_token');
        res.json({ token: token });
    }).catch( err => {
        res.status(500).json(err);
        return res;
    });
});

app.post('/login',
    body('name').isEmail(),
    body('password').isLength({ min: 4 }),
    (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    User.findOne({ where: { email: req.body.name } })
        .then( usr => {
            if (bcrypt.compareSync(req.body.password, usr.password)) {
                const obj = {
                    userId: usr.id,
                    user: usr.name
                };

                const token = jwt.sign(obj, 'secret_token');
                res.json({ token: token });
            } else {
                res.status(400).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

app.listen({ port: 9000 }, async () => {
    console.log('Listening on port 9000');
    await sequelize.authenticate();
});
