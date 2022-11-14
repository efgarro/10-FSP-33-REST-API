const express = require("express");
const serverApp = express();
const cors = require("cors");
module.exports = serverApp;

/* Do not change the following line! It is required for testing and allowing
 *  the frontend application to interact as planned with the api server
 */
const PORT = process.env.PORT || 4000;

// Add middleware for handling CORS requests from index.html
serverApp.use(cors());
// Add middware for parsing request bodies here:
serverApp.use(express.json());
serverApp.use(express.urlencoded({ extended: false }));

// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require("./srcServer/Routes/apiRouter");
serverApp.use("/api", apiRouter);

// This conditional is here for testing purposes:
if (!module.parent) {
  // Add your code to start the server listening at PORT below:

  serverApp.listen(PORT, () => {
    console.log(`Listening to port...${PORT}`);
  });
}
