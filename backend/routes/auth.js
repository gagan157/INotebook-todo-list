const express = require("express");
const User = require('../models/Users')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../Middlewares/fetchuserdetail')


const JWT_SECRET = 'thisisreactcode'

//this get two parameters first url end point and send callback 
router.post('/signup',
    [
        body('name', "Please Enter Mininum 3 char").isLength({ min: 3 }),
        body('email', "Please Enter correct Email").isEmail(),
        body('password', "Miniumn Lenght 5").isLength({ min: 5 }),

    ]
    //this callback also take two argument fist request and second response
    , async (req, res) => {
        //this create error and check if error is not empty
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //find email not exists in Users model list
        let user = await User.findOne({ email: req.body.email })

        //if user exists then return error
        if (user) {
            return res.status(400).json({ errors: "Your email is already exists Please Enter Another Email" })
        }

        //change password into hash for more secuirty
        const salt = await bcrypt.genSalt(10);
        const secpasshash = await bcrypt.hash(req.body.password, salt);

        //create New user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secpasshash,
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const auttoken = jwt.sign(data, JWT_SECRET);
        res.json({ auttoken: auttoken, msg: "create account" })
        console.log('Data Send')

    })


//user login
router.post('/login',
    [
        body('email', "please enter valid email").isEmail(),
        body('password', "Enter valid pass").exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body
        try {
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({ errors: "wrong Email" })
            }
            const passcompare = await bcrypt.compare(password, user.password)
            if (!passcompare) {
                return res.status(400).json({ errors: "wrong password" })
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const auttoken = jwt.sign(data, JWT_SECRET);
            res.json({ auttoken: auttoken, msg: "login sucess" })
        }
        catch (error) {
            console.log(error)
            res.status(500).send("internal server error")
        }
    })


//Get Login user Details    
router.post('/getuser', fetchuser,
    async (req, res) => {
        try {
            const userid = req.user.id
            const userd = await User.findById(userid).select('-password')
            res.send(userd)
        }
        catch (error) {
            console.log(error)
            res.status(500).send("internal server error")
        }
    })

module.exports = router