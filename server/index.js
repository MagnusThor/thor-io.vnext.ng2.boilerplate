var customBroker =require("../controllers/NeoRTCBrokerController.js");
var express = require("express");

app = express();
 
var thorio = require("thor-io.vnext").ThorIO;

var thorIO = new thorio.Engine(
    [
    thorio.Controllers.BrokerController,
    customBroker.NeoRTCBrokerController
    ]
); // would be nice if we could find ThorIO.Controllers by enum the file system?

var expressWs = require("express-ws")(app);

app.use("/", express.static("client"));
app.use("/app", express.static("client"));

app.use("/shared", express.static("shared")); 
app.use("/lib", express.static("node_modules")); 

app.ws("/", function (ws, req) {    
       thorIO.addWebSocket(ws,req);
});

var port = process.env.PORT || 8080;
app.listen(port);