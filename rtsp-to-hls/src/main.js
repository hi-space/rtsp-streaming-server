var http = require('http');
var fs = require('fs');

const port = 3000

http.createServer(function (request, response) {
    console.log('request starting...');

    var filePath = '.' + request.url;
    console.log(filePath)
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
