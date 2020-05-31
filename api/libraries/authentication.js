const express = require("express");
const Users = require("../models/users");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

module.exports = class Authlib {

    userChecker(req, type){
        let data = {email: req.body.email};
        if(type == 'signup'){
            data = {email: req.body.email};
        } else {
            data = {email: req.body.email, password: req.body.password};
        }

        return Users.find(data)
        .then(doc => {
            console.log(doc)
            if(doc.length > 0){
                return true;
            }
        })
        .catch( err => {
            return false;
        })
    }
    
    authUser(email, password, callback){
        jwt.sign({email: email, password: password}, process.env.JWTKEY, (err, token) => {
            callback(err, token);
        })
    }

    validateUser(req, res, next) {
        this.checkUserExistence(req, res, (token => {
            if ( token ) {
                res.status(200)
                    .json({
                        message: "Token Request / Successfull",
                        token: token    
                    })
            } else {
                res.status(400)
                    .json({
                        message: "Token Request Failed",
                        details: "check your authentication details"
                    })
            }
        }));
    }
    
    async checkUserExistence(req, res, callback){
        const existing = await this.userChecker(req, "auth");
        console.log(existing);
        if(existing === true){
            this.authUser(req.body.email, req.body.password, (err, token) => {
                console.log(token);
                callback(token);
            });
        } else {
            callback(false);
        }
    }
    
    async addUser(req, res){
        const existing = await this.userChecker(req, "signup");
        if (existing !== true) {
            const user = new Users({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                name: req.body.name,
                password: req.body.password
            });
            user.save()
                .then( docs => {
                    this.validateUser(req, res)
                })
                .catch( err => {
                    console.log("Something went wrong"),
                    res.status(201).json({
                        message: "Something went wrong",
                        details: err
                    })
                })
        } else {
            res.status(500)
                .json({
                    message: "User Already Exist",
                    email: req.body.email
                })
        }
    }
}