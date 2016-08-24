var express = require("express");
app = express();
 
var thorio = require("thor-io.vnext").ThorIO;

var brokerController = require("../rtccontrollers/broker.controller.js").BrokerController;

var thorIO = new thorio.Engine([
    brokerController
]);

var expressWs = require("express-ws")(app);
app.use("/", express.static("client"));
app.use("/app", express.static("client"));

app.use("/shared", express.static("shared")); 
app.use("/lib", express.static("node_modules")); 


app.ws("/", function (ws, req) {
    thorIO.addConnection(ws);
});

var port = process.env.PORT || 1337;;
app.listen(port);