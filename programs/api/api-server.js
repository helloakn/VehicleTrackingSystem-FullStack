require('dotenv').config();
const express = require("express");
const cors = require("cors");
const config = require('./app/config/lib.config.js');

express.application.prefix = express.Router.prefix = function (path, configure) {
    var router = express.Router();
    this.use(path, router);
    configure(router);
    return router;
  };

const app = express();
var corsOptions = {
  origin: config.Origin.allowFrom
};
app.use(cors(corsOptions));
// Parse URL-encoded bodies (as sent by HTML forms)

app.use(
    express.urlencoded({
      extended: true
    })
  )
  
  app.use(express.json())
  

// simple route
app.post("/test", function(req,res) {
    console.log(req.body);
    res.json({ message:req.body});
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Vehicle Tracking Admin API." });
});
//require("./app/routes/authorization.routes.js")(app);




require("./app/routes/index.routes.js")(app);
// set port, listen for requests
const PORT = process.env.SVR_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});