const router = require('express').Router()
const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')

const ROOT_PATH = 'stream/'
let ffmpegDict = {}

router.post('/stream/:cctv_id', async function(req, res) {
    const cctvId = req.params.cctv_id
    const rtsp = req.body.rtspUrl || ''
    const account = req.body.account || ''
    const password = req.body.password || ''
    
    const rtspUrl = `rtsp://${account}:${password}@${rtsp}`
    console.log("Stream Start: " + rtspUrl)

    if (!fs.existsSync(ROOT_PATH + cctvId)) {
        fs.mkdirSync(ROOT_PATH + cctvId, { recursive: true })
    }

    if (cctvId in ffmpegDict) {
        console.log("already started staream. kill them.")
        ffmpegDict[cctvId].kill()
        fs.rmdirSync(ROOT_PATH + cctvId, { recursive: true })
        delete ffmpegDict[cctvId]
    }

    try {
        const ffmpegId = new ffmpeg(rtspUrl).addOptions([
            '-fflags nobuffer',
            '-vsync 0',
            '-copyts',
            '-hls_flags delete_segments+append_list+omit_endlist',
            '-hls_playlist_type event',
            '-hls_time 1',
            '-hls_list_size 1',
            '-hls_wrap 1',
        ]).inputOptions([
            '-rtsp_transport tcp'
        ]).on('start', function (commandLine) {
            console.log('FFmpeg with command: ' + commandLine)
        }).on('codecData', function (data) {
            res.status(200).send({ id : cctvId, url : `${ROOT_PATH}/${cctvId}/${cctvId}.m3u8`})
        }).on('error', function (err) {
            console.log(err)
        }).saveToFile(`${ROOT_PATH}/${cctvId}/${cctvId}.m3u8`)
    
        ffmpegDict[cctvId] = ffmpegId
    } catch (err) {
        console.log(err)
        return res.status(500).send()
    }    
});

router.delete('/stream/:cctv_id', async function(req, res) {
    const cctvId = req.params.cctv_id
    console.log("Stream Stop: " + cctvId)

    try {
        if (cctvId in ffmpegDict) {
            ffmpegDict[cctvId].kill()
            fs.rmdirSync(ROOT_PATH + cctvId, { recursive: true })
            delete ffmpegDict[cctvId]
        }
        return res.status(200).send()
    } catch (err) {
        console.log(err)
        return res.status(500).send()
    }
});

module.exports = router
