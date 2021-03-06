const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require("express-validator");
const config = require('config');
const User = require("../models/User");

const userRouter = express.Router();

// create a user and generate JWT
userRouter.post(
    "/",
    [
        check("name", "Please enter a name").not().isEmpty(),
        check("email", "Please incluse a valid email").isEmail(),
        check(
            "password",
            "Please enter a password with 6 or more characters"
        ).isLength({ min: 6 }),
    ],
    async (req, res) => {

		// check validation by express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            // if user already exists, can't create a new one
            if (user) {
                return res
                    .status(400)
                    .json({
                        msg: "User already exists! Enter a different email.",
                    });
			}

            // create new User
			user = new User({
				name,
				email,
				password
			});

			// hashing the password
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			await user.save();

            // create JWT
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
			console.error(err);
			res.status(500).send('Server error!');
		}
    }
);

module.exports = userRouter;
