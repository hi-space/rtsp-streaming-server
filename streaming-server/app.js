var express = require('express');
var fs = require('fs');
var https = require('https')

const port = 4000
// const options = {
//     hostname: 'yoo.hispace.kr',
//     key: fs.readFileSync('/etc/letsencrypt/live/hispace.kr/privkey.pem'),
//     cert: fs.readFileSync('/etc/letsencrypt/live/hispace.kr/cert.pem')
// }
const options = {
    hostname: 'yoo.hispcae.kr',
    key: fs.readFileSync('D://share/privkey1.pem'),
    cert: fs.readFileSync('D://share/cert1.pem'),
}

var app = express();

const httpsServer = https.createServer(options, app);
httpsServer.listen(port, () => {
    var host = httpsServer.address().address;
    var port = httpsServer.address().port;
    
    console.log('Streaming Server is working : host - ', host);
    console.log('Streaming Server is working : PORT - ', port);
})

app.use(function (request, response) {
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
})

module.exports = app;
