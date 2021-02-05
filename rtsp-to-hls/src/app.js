// const app = require('express')();
// const fs = require('fs');
// const hls = require('hls-server');
// const cors = require('cors');

// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     next();
//   });
// app.use(cors());

// app.get('/', (req, res) => {
//     return res.status(200).sendFile(`${__dirname}/client.html`);
// });

// const server = app.listen(4000);

// new hls(server, {
//     provider: {
//         exists: (req, cb) => {
//             const ext = req.url.split('.').pop();
//             console.log(__dirname + req.url)

//             if (ext !== 'm3u8' && ext !== 'ts') {
//                 return cb(null, true);
//             }
            
//             fs.access(__dirname + req.url, fs.constants.F_OK, function (err) {
//                 if (err) {
//                     console.log('File not exist');
//                     return cb(null, false);
//                 }
//                 cb(null, true);
//             });
//         },
//         getManifestStream: (req, cb) => {
//             const stream = fs.createReadStream(__dirname + req.url);
//             cb(null, stream);
//         },
//         getSegmentStream: (req, cb) => {
//             const stream = fs.createReadStream(__dirname + req.url);
//             cb(null, stream);
//         }
//     }
// });

var https = require('https')
var fs = require('fs');

const port = 4000
const options = {
    hostname: 'yoo.hispace.kr',
    key: fs.readFileSync('/etc/letsencrypt/live/hispace.kr/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/hispace.kr/cert.pem')
}

https.createServer(options, function (request, response) {
    var filePath = '.' + request.url;
    // var filePath = 'videos/output.m3u8'

    fs.readFile(filePath, function(error, content) {
        response.writeHead(200, { 'Access-Control-Allow-Origin': '*' });
        console.log(filePath)
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('./404.html', function(error, content) {
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end(); 
            }
        }
        else {
            response.end(content, 'utf-8');
        }
    });

}).listen(port);
console.log(`Server running at http://127.0.0.1:${port}/`);
