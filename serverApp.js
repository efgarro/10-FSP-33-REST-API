const express = require("express");
const serverApp = express();
const cors = require("cors");
const apiRouter = require("./srcServer/Routes/apiRouter");

/* Do not change the following line! It is required for testing and allowing
*  the frontend application to interact as planned with the api server
*/
const PORT = process.env.PORT || 4000;

// Add middleware for handling CORS requests from index.html
serverApp.use(cors());
// Add middware for parsing request bodies here:
serverApp.use(express.json());
serverApp.use(express.urlencoded({ extended: false }));

serverApp.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
        );
        res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
        next();
    });
    
    // Mount your existing apiRouter below at the '/api' path.
    serverApp.use("/api", apiRouter);
    
    // This conditional is here for testing purposes:
    if (!module.parent) {
        // Add your code to start the server listening at PORT below:
        
        serverApp.listen(PORT, () => {
            console.log(`Listening to port...${PORT}`);
        });
    }
    
    module.exports = serverApp;