// Stream = require('node-rtsp-stream');

// const onvif = require('node-onvif')

// const express = require("express");
// const app = express();
// const path = require('path');


// var stream = new Stream({
//   name: 'name',
//   streamUrl: 'rtsp://admin:geniuszz12@220.71.87.250:554/media/video1',
//   wsPort: 9999
// });

// console.log(stream)


// app.use(express.static(path.join(__dirname, 'public')));
// app.get("/",(req,res)=>{
//     console.log( process.camera)
//     res.write(`<html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <meta http-equiv="X-UA-Compatible" content="ie=edge">
//         <style>
//           canvas {
//             display: block;
//             float: left;
//             transform: scale(1);
//            transform-origin: 0% 0% 0px;
//           }
//           .camera{
//             display: block;
//             margin-left: 10px;
//             margin-top: 10px;
//             padding: 0px;
//             width: 400px;
//           }
//         </style>
//         <title>RTSP STREAMING NODE JS IP CAMERA </title>
//        <h1>RTSP STREAMING NODE JS IP CAMERA </h1>

//  <div><canvas class="camera" id="videoCanvas" width="640" height="360"></canvas></div>
      
    
//         <script type="text/javascript" src="jsmpeg.js"></script>
//         <script type="text/javascript">
    

//        var canvas = document.getElementById('videoCanvas');
//                      var ws = new WebSocket("ws://localhost:9999")
//                      var player = new jsmpeg(ws, {canvas:canvas, autoplay:true,audio:false,loop: true });
//         </script>
    
//     <body>
          
//     </body>
//     </html>`) 

//     res.end();
// })  

// app.listen(8081) 
 
 
//  /*
 
// stream = new Stream({
//     name: 'name',
//     streamUrl: 'rtsp://192.168.2.202:554/stream1',
//     wsPort: 9999
// });
 
// Stream = require('node-rtsp-stream');
// stream = new Stream({
//     name: 'name',
//     streamUrl: 'rtsp://192.168.2.217:554/stream1',
//     wsPort: 9998
// });

// Stream = require('node-rtsp-stream');
// stream = new Stream({
//     name: 'name',
//     streamUrl: 'rtsp://192.168.2.205:554/stream1',
//     wsPort: 9997
// });*/
