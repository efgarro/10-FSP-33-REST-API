const express = require("express");
const usersRouter = require("./users.routes");
// const ideasRouter = require("./ideas");
// const meetingsRouter = require("./meetings");
const apiRouter = express.Router();

module.exports = apiRouter;

apiRouter.use("/users", usersRouter);
// apiRouter.use("/users", (req, res) => {
//   res.send("users");
// });
// apiRouter.use("/ideas", ideasRouter);
// apiRouter.use("/meetings", meetingsRouter);