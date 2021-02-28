# rtsp-to-hls

## FFmpeg cmd

```sh
ffmpeg -fflags nobuffer \
 -rtsp_transport tcp \
 -i rtsp://id:pwd@ip \
 -vsync 0 \
 -copyts \
 -vcodec copy \
 -movflags frag_keyframe+empty_moov \
 -an \
 -hls_flags delete_segments+append_list \
 -f segment \
 -strftime 1 \
 -segment_list_flags live \
 -segment_time 1 \
 -segment_list_size 3 \
 -segment_format mpegts \
 -segment_list videos/output.m3u8 \
 -segment_list_type m3u8 \
 videos/stream-%S.ts
```

```sh
ffmpeg -fflags nobuffer \
 -rtsp_transport tcp \
 -i rtsp://id:pwd@ip \
 -vsync 0 \
 -copyts \
 -vcodec copy \
 -movflags frag_keyframe+empty_moov \
 -an \
 -hls_flags delete_segments+append_list \
 -f segment \
 -segment_list_flags live \
 -segment_time 1 \
 -segment_wrap 50 \
 -segment_list_size 3 \
 -segment_format mpegts \
 -segment_list videos/output.m3u8 \
 -segment_list_type m3u8 \
 videos/stream-%d.ts
```

```sh
ffmpeg -fflags nobuffer \
 -rtsp_transport tcp \
 -i rtsp://id:pwd@ip \
 -vf scale=640x480
 -vsync 0 \
 -copyts \
 -vcodec libx264 \
 -hls_flags omit_endlist+append_list \
 -hls_playlist_type event \
 -hls_time 1 \
 -hls_list_size 3 \
 -hls_wrap 10 \
 videos/output.m3u8
```
