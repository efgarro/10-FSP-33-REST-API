const express = require("express");
const { getUsers } = require("../Controllers/usersController");
const usersRouter = express.Router();


usersRouter.get("/", getUsers);
// usersRouter.get("/", (req, res) => {
//   res.send("Message without DB");
// });

module.exports = usersRouter;
