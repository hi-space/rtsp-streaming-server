ffmpeg -fflags nobuffer \
 -rtsp_transport tcp \
 -i rtsp://admin:geniuszz12@220.71.87.34:554/media/video1 \
 -vsync 0 \
 -copyts \
 -vcodec copy \
 -movflags frag_keyframe+empty_moov \
 -an \
 -hls_flags delete_segments+append_list \
 -f segment \
 -segment_list_flags live \
 -segment_time 1 \
 -segment_wrap 10 \
 -segment_list_size 3 \
 -segment_format mpegts \
 -segment_list videos/output.m3u8 \
 -segment_list_type m3u8 \
 videos/stream-%d.ts

