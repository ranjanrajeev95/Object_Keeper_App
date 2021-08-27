const express = require("express");
const userRouter = require("./src/routes/users");
const objectsRouter = require("./src/routes/objects");
const authRouter = require("./src/routes/auth");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// connect the DB
connectDB();

// initialize middleware
app.use(express.json({ extended: false })); // converts req.body to json

// index page
app.get("/", (req, res) => res.json({ msg: "Welcome to object keeper" }));

// routes (in ./src/routes)
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/objects", objectsRouter);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
