import React from 'react';
import ReactPlayer from 'react-player/vimeo';
import { useState } from 'react';

const VideoPlayer = (props) => {
  const [play, setPlay] = useState(false);

  const handleOnReady = () => setTimeout(() => setPlay(true), 30);

  return (
    // <div className="player-wrapper">
    <div>
      <ReactPlayer
        // muted={true}
        volume={0.5}
        width="50vw"
        // height="100%"
        controls
        url={props.src}
      />
    </div>
  );
};

export default VideoPlayer;
