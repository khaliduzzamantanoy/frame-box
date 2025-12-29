"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";

interface VideoPlayerProps {
  src: string;
  channelName: string;
}

export function VideoPlayer({ src, channelName }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current || !src) return;

    const video = videoRef.current;
    let hls: Hls | null = null;

    // Check if HLS is needed (M3U8 URLs)
    if (src.includes(".m3u8")) {
      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(video);
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // Safari native HLS support
        video.src = src;
      }
    } else {
      // Direct stream URL
      video.src = src;
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);

  return (
    <div className="video-player-container">
      <video
        ref={videoRef}
        className="w-full aspect-video bg-black"
        controls
        autoPlay
        crossOrigin="anonymous"
      />
      <div className="video-player-title absolute top-0 left-0 right-0 p-4">
        <p className="text-white font-bold text-xl pixel-font drop-shadow-lg">
          {channelName}
        </p>
      </div>
    </div>
  );
}
