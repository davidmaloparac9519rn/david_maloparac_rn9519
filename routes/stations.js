const { sequelize, Station } = require('../models');
const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/stations', (req, res) => {
    Station.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

router.get('/stations/:id', (req, res) => {
    Station.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

router.post('/stations',
    body('name').isLength({ min: 1 }),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
    Station.create({ name: req.body.name })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

router.put('/stations/:id', (req, res) => {
    Station.findOne({ where: { id: req.params.id } })
        .then( stn => {
            stn.name = req.body.name;

            stn.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

router.delete('/stations/:id', (req, res) => {
    Station.findOne({ where: { id: req.params.id } })
        .then( stn => {
            stn.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = router;
