var express = require('express')
var fs = require('fs')
var https = require('https')
var bodyParser = require('body-parser');

const port = 4000
const options = {
    // hostname: 'yoo.hispace.kr',
    key: fs.readFileSync('/etc/letsencrypt/live/hispace.kr/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/hispace.kr/cert.pem')
}
// const options = {
//     hostname: 'yoo.hispcae.kr',
//     key: fs.readFileSync('D://share/privkey1.pem'),
//     cert: fs.readFileSync('D://share/cert1.pem'),
// }

var app = express()
app.use(bodyParser.json());

const httpsServer = https.createServer(options, app)
httpsServer.listen(port, () => {
    var host = httpsServer.address().address
    var port = httpsServer.address().port
    
    console.log(`Streaming Server is working : ${host}:${port}`)
})

app.use('/', require('./routes'))

app.use(function (request, response) {
    var filePath = '.' + request.url
    try {
        fs.readFile(filePath, function(error, content) {
            response.writeHead(200, { 'Access-Control-Allow-Origin': '*' })
    
            if (!error) {
                console.log(filePath)
                response.end(content, 'utf-8')
            } else {
                console.log(error)
                // response.writeHead(500)
                response.end()
            }
        })
    } catch (err) {
        // response.writeHead(500)
        response.end()
    }
})

app.use(function (req, res, next) {
    next()
    return res.status(500).send('error')
})

module.exports = app
