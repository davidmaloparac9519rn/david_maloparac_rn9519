const { sequelize, Ride } = require('../models');
const express = require('express');
const { body, validationResult } = require('express-validator');
const ride = require('../models/ride');

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/rides', (req, res) => {
    Ride.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

router.get('/rides/:id', (req, res) => {
    Ride.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

router.post('/rides',
    body('name').isLength({ min: 1 }),
    body('number_of_passengers').isLength({ min: 1 }),
    body('train_id').isLength({ min: 1 }),
    body('start_id').isLength({ min: 1 }),
    body('end_id').isLength({ min: 1 }),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

    Ride.create({ name: req.body.name, number_of_passengers: req.body.number_of_passengers,
         train_id: req.body.train_id, start_id: req.body.start_id, end_id: req.body.end_id })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

router.put('/rides/:id', (req, res) => {
    Ride.findOne({ where: { id: req.params.id } })
        .then( rid => {
            rid.name = req.body.name;
            rid.number_of_passengers = req.body.number_of_passengers;

            rid.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

router.delete('/rides/:id', (req, res) => {
    Ride.findOne({ where: { id: req.params.id } })
        .then( rid => {
            rid.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = router;
