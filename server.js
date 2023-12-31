// import modules
const express = require("express"); // - https://expressjs.com/en/starter/installing.html
const path = require("path"); // - https://www.npmjs.com/package/path
const logger = require("morgan"); // - https://www.npmjs.com/package/morgan
require("dotenv").config(); // - https://www.npmjs.com/package/dotenv#-documentation
require("./config/database"); // - connect to MongoDB

const bodyParser = require("body-parser");

// storing invoked express object in variable 'app'
const app = express();

// setting the port
const port = process.env.PORT || 3001;

// middleware (called on all server requests)
app.use(logger("dev"));
app.use(express.json()); // https://expressjs.com/en/api.html
app.use(express.static(path.join(__dirname, "build")));

// middleware that adds the user object from a JWT to req.user
app.use(require('./config/checkToken'));

// api routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/pets", require("./routes/api/pets"));
app.use("/api/vets", require("./routes/api/vets"));

// Protect the api routes below from anon users
app.use(require('./config/ensureLoggedIn'))
app.use("/api/dogs", require("./routes/api/dogs"));

app.use(require("./config/checkToken"));

// express route handler (for all * routes)
app.get("/*", function (req, res) {
    // HTTP response object's .sendFile method()
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

// express server listening at port
app.listen(port, function () {
    console.log(`Express app running on port ${port}`);
});

module.exports = app;
