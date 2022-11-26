const express = require("express");
const passport = require("passport");
const apiRouter = express.Router();


// const usersRouter = require("./authRouter");
// const ideasRouter = require("./ideas");
// const meetingsRouter = require("./meetings");


// apiRouter.use("/users", usersRouter);
// apiRouter.use("/users", (req, res) => {
    //   res.send("users");
    // });
    // apiRouter.use("/ideas", ideasRouter)
    // apiRouter.use("/meetings", meetingsRouter);
    
apiRouter.get(
    "/protected",
    passport.authenticate("jwt", { session: false }),
    (req, res, next) => {
        res.send("Hellow Bella");
    }
    );
    
module.exports = apiRouter;