const express = require("express")
const router = express.Router()
const Users = require("../models/users")
const formschema = require("../form_validations/auth")
const formValidation = new formschema()
const authlib = require("../libraries/authentication")
const check_auth = require("../middleware/check_auth")
const userauth = new authlib()
const md5 = require("md5")

router.get('/', (req, res, next) => {
    Users.find()
        .exec()
        .then( docs => {
            console.log("Success Retrieving Data");
            res.status(200).json({
                message: "Data Retrieve is Successfull",
                details: docs
            })
        })
        .catch( err => {
            console.log("Something went wrong");
            res.status(200).json({
                message: "Data Retrieve UnSuccessfull",
                details: err
            })
        });
});


router.post('/', (req, res, next) => {

    const validateUser = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
    };

    formValidation.validateForms(validateUser, (result) => {
        if (!result.error) {
            req.body.password = md5(req.body.password)
            userauth.addUser(req, res);
        } else {
            res.status(500).json({
                message: `Please check if all information provided are correct | ${result.error.details[0].message}`,
                details: result.error
            });
        }
    });
})

router.get('/validatetoken', check_auth, (req, res, next) => {
    res.status(200)
        .json({
            message: "Token is valid!"
        })
})

router.post('/auth', (req, res, next) => {
    req.body.password = md5(req.body.password)
    userauth.validateUser(req, res, next);
})



module.exports = router;