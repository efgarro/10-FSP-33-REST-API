const express = require("express");
const usersRouter = express.Router();
const { getUsers } = require("../Controllers/usersController");

module.exports = usersRouter;

usersRouter.get("/", getUsers);