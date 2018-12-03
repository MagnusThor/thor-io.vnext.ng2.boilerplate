var customBroker =require("../controllers/NeoRTCBrokerController.js");
var express = require("express");

app = express();

require("express-ws")(app);

var thorio = require("thor-io.vnext").ThorIO;

var thorIO = new thorio.Engine(
    [
    thorio.Controllers.BrokerController,
    customBroker.NeoRTCBrokerController
    ]
); // would be nice if we could find ThorIO.Controllers by enum the file system?


app.use("/", express.static("dist"));
app.use("/client", express.static("client"));


app.ws("/", function (ws, req) {    
       thorIO.addWebSocket(ws,req);
});

var port = process.env.PORT || 8080;
app.listen(port);