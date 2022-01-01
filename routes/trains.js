const { sequelize, Train } = require('../models');
const express = require('express');
const { body, validationResult } = require('express-validator');
const Joi = require('joi');

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/trains', (req, res) => {
    Train.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

router.get('/trains/:id', (req, res) => {
    Train.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

router.post('/trains',
    body('name').isLength({ min: 1 }),
    body('number_of_seats').isLength({ min: 1 }),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

    Train.create({ name: req.body.name, number_of_seats:req.body.number_of_seats })
        .then( rows => res.json(rows) )
        .catch( err =>{
            console.log(err);
            res.status(500).json(err)
         } );
});

router.put('/trains/:id', (req, res) => {
    Train.findOne({ where: { id: req.params.id } })
        .then( trn => {
            trn.name = req.body.name;
            trn.number_of_seats = req.body.number_of_seats;

            trn.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

router.delete('/trains/:id', (req, res) => {
    Train.findOne({ where: { id: req.params.id } })
        .then( trn => {
            trn.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = router;
