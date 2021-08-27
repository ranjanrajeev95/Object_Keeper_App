// This is a CRUD route
const express = require("express");
const objectsRouter = express.Router();
const { check, validationResult } = require("express-validator");

const auth = require("../middleware/auth");
const Object = require("../models/Object");

// get all objects of particular user
objectsRouter.get("/", auth, async (req, res) => {
    try {
        const objects = await Object.find({ user: req.user.id }).sort({
            date: -1,
        });
        res.json(objects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// create a new object and save in DB
objectsRouter.post(
    "/",
    [
        auth,
        check("name", "Name is required.").not().isEmpty(),
        check("location", "Location is required.").not().isEmpty(),
    ],
    async (req, res) => {
        // check middleware validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, location, extras } = req.body;

        try {
            const newObject = new Object({
                name,
                location,
                extras,
                user: req.user.id,
            });

            const object = await newObject.save();
            res.json(object);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    }
);

// edit an object
objectsRouter.put("/:id", auth, async (req, res) => {
    const { name, location, extras } = req.body;

    //build new Object's object
    const objectData = {};
    if (name) objectData.name = name;
    if (location) objectData.location = location;
    if (extras !== null) objectData.extras = extras;

    try {
        // first we extract the object from DB to do some checks
        let object = await Object.findById(req.params.id);

        // maing sure object exists
        if (!object)
            return res.status(404).json({ msg: "No such object found." });
        // making user the user owns that object
        if (object.user.toString() !== req.user.id)
            return res.status(401).json({ msg: "Unauthorized user access!" });

        // now we will edit that object
        object = await Object.findByIdAndUpdate(req.params.id, {
            $set: objectData,
        });
        res.json(object);
    } catch (error) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// delete an object
objectsRouter.delete("/:id", auth, async (req, res) => {
    try {
        // first we extract the object from DB to do some checks
        let object = await Object.findById(req.params.id);

        // maing sure object exists
        if (!object)
            return res.status(404).json({ msg: "No such object found." });
        // making user the user owns that object
        if (object.user.toString() !== req.user.id)
            return res.status(401).json({ msg: "Unauthorized user access!" });

        // now we will delete that object
        await Object.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Object removed' });
    } catch (error) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = objectsRouter;
