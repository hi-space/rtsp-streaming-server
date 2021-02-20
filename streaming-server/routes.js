const router = require('express').Router()
const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')

router.get('/', function(req, res) {
    console.log('hello')
});

router.post('/stream/:cctv_id', async function(req, res) {
    console.log("!!!! Stream Start")
    const cctvId = req.params.cctv_id
    const rtsp = req.body.rtspUrl || ''
    const account = req.body.account || ''
    const password = req.body.password || ''
    
    if (!fs.existsSync(cctvId)) {
        fs.mkdirSync(cctvId, { recursive: true })
    }

    const rtspUrl = `rtsp://${account}:${password}@${rtsp}`

    new ffmpeg(rtspUrl).addOptions([
        '-fflags nobuffer',
        '-vsync 0',
        '-copyts',
        '-vcodec libx264',
        '-hls_flags delete_segments+append_list+omit_endlist',
        '-hls_playlist_type event',
        '-hls_time 1',
        '-hls_list_size 3',
        '-hls_wrap 10',        
    ]).inputOptions([
        '-rtsp_transport tcp'
    ]).on('start', function (commandLine) {
        console.log('FFmpeg with command: ' + commandLine)
    }).on('codecData', function (data) {
        res.status(200).send({ id : cctvId, url : `/stream/${cctvId}/output.m3u8`})
    }).on('error', function (err) {
        console.log(err)
    }).saveToFile(`./${cctvId}/output.m3u8`)
});

router.delete('/stream/:cctv_id', async function(req, res) {
    console.log("!!!! Stream Stop")
    const cctvId = req.params.cctv_id

    fs.rmdirSync(cctvId, { recursive: true })

    return res.status(200).send()
});

module.exports = router
