const express = require("express");
const serverApp = express();
// const cors = require("cors");
const apiRouter = require("./srcServer/Routes/apiRouter");
const passport = require("passport");

/* Do not change the following line! It is required for testing and allowing
 *  the frontend application to interact as planned with the api server
 */
const PORT = process.env.PORT || 4000;

require("dotenv").config();
require("./srcServer/Config/dbClient");

// Pass the global passport object into the configuration function
require("./srcServer/Config/passportStrat");

// This will initialize the passport object on every request
serverApp.use(passport.initialize());

// Add middleware for handling CORS requests from index.html
// serverApp.use(cors());

// Add middware for parsing request bodies here:
serverApp.use(express.json());
serverApp.use(express.urlencoded({ extended: false }));
// Allows our Angular application to make HTTP requests to Express application

serverApp.get("/", (req, res) => res.send("Hellow Bella!"));
serverApp.use("/api", apiRouter);

serverApp.listen(PORT, () => {
  console.log(`Listening to port...${PORT}`);
});

module.exports = serverApp;
