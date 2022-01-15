const { sequelize, User } = require('../models');
const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/users', (req, res) => {
    User.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

router.get('/users/:id', (req, res) => {
    User.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

router.post('/users',
    body('email').isEmail(),
    body('name').isLength({ min: 1 }),
    body('password').isLength({ min: 4 }),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        User.create({ name: req.body.name, 
            email: req.body.email, 
            password: bcrypt.hashSync(req.body.password, 10), 
            type: req.body.type })
            .then( rows => res.json(rows) )
            .catch( err => res.status(500).json(err) );
});

router.put('/users/:id', (req, res) => {
    User.findOne({ where: { id: req.params.id } })
        .then( usr => {
            usr.name = req.body.name;
            usr.email = req.body.email;
            // usr.train_id = req.body.train_id;
            usr.type = req.body.type;

            usr.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

router.delete('/users/:id', (req, res) => {
    User.findOne({ where: { id: req.params.id } })
        .then( usr => {
            usr.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = router;
