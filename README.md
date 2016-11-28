# thor-io.vnext.ng2.boilerplate  ( + webrtc demo )

## About

This example is based Dan Wahlins angular2 jump start found on  https://github.com/DanWahlin/Angular2-JumpStart 
and contains a very simple
webrtc video conference plus a simple chat function that allows users in to send
chatmessages.

Its based on thor-io.vnext and runs on nodeJS.

This repo contains the complere source code for the demo application at https://webrtc-lab.herokuapp.com/.

Many thanks to Dan for great boiler, and sorry of i messed it up :-)

## Links

The demo ( code in this repo) is deployed at Heroku at the follwing url - https://webrtc-lab.herokuapp.com/

A short video (non edited) can be found here - https://www.youtube.com/watch?v=X6mAuMjsnSg

## Info

Look at /server/index.js and you will get a clue how to set-up thor-io, as well as in /rtccontroller folder you will find
the "backend controller". The ThorIO.Controller used by the demo
is named BrokerController.ts , it takes care of the WebRTC signaling.

## Todo

As today there is _only_ a STUN configuration added for the RTCPeerConnections, so as soon as possible
we will set up a TURN server somewhere.  We may also refine the whole, add more features.




