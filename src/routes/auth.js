const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const config = require("config");
const auth = require('../middleware/auth');
const User = require("../models/User");

const authRouter = express.Router();

// get details of a user
authRouter.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        console.log('here');
        res.status(500).send('Server error');
    }
});

// login and get a token
authRouter.post(
    "/",
    [
        check("email", "Please enter valid email.").isEmail(),
        check("password", "Password is required.").exists(),
    ],
    async (req, res) => {

        // check validation by express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            // user not found
            if(!user) {
                return res.status(400).json({ msg: 'Invalid credentials'});
            }

            // user found
            const matches = await bcrypt.compare(password, user.password);

            // password doesn't match
            if(!matches) {
                return res.status(400).json({ msg: 'Invalid credentials'});
            }

            const payload = {
				user: {
					id: user.id
				}
			};

			jwt.sign(payload, config.get('jwtSecret'), {
				expiresIn: 360000
			}, (err, token) => {
				if(err) throw(err);
				res.json({ token });
			});
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error!");
        }
    }
);

module.exports = authRouter;
