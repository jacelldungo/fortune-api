const express = require("express");
const router = express.Router();
const Fortune = require("../models/fortune")
const FortuneValidation = require("../form_validations/fortune")
const fieldchecker = new FortuneValidation
const mongoose = require("mongoose");
const checkauth = require("../middleware/check_auth")

//Get Data from fortune table at random
router.get('/', checkauth, (req, res, next) => {
    Fortune.countDocuments()
        .exec((err, count) => {
            var random = Math.floor(Math.random() * count)

            Fortune.findOne().skip(random).exec((err, result) => {
                res.send(result)
            })
        })

})

//Get Data from fortune table at specific
router.get('/:id', checkauth, (req, res, next) => {
    Fortune.findById(req.params.id)
        .exec()
        .then( docs => {
            console.log(docs),
            res.status(200).json({
                message: "Items List",
                docs
            })
        })
        .catch( err => {
            console.log(err);
            res.status(500).json(
                err
            );
        });

})

//Patch Data on Mongo db 
router.patch('/:id', checkauth, (req, res, next) => {
    datavalidation = {
        _id: req.params.id,
        fortune: req.body.fortune
    }

    fieldchecker.validateForm(datavalidation, (result) => {
        if (!result.error) {
            Fortune.findByIdAndUpdate({
                _id: req.params.id
            },{
                fortune: req.body.fortune
            })
            .then( docs => {
                console.log(docs);
                res.status(200)
                    .json({
                    message: "Fortune was successfully updated. Great thought!",
                    details: docs,
                    fortune: req.body.fortune
                })
            })
            .catch( err => {
                res.status(500)
                    .json({
                    message: "Something went wrong",
                    details: err
                })
            })
        } else {
            res.status(401)
                .json({
                    message: "Form Validation Failed",
                    details: result.error
                })
        }
    })

})

//Patch Data on Mongo db 
router.post('/', checkauth, (req, res, next) => {
    const fortune = new Fortune({
        _id: mongoose.Types.ObjectId(),
        fortune: req.body.desc
    });

    fortune
        .save()
        .then( docs => {
            console.log(docs);
            res.status(201).json({
                message: "fortune was successfull",
                details: docs
            })
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({
                message: "Something went wrong",
                details: err
            })
        })

})

module.exports = router;