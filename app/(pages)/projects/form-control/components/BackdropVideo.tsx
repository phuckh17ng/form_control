"use client";

import React from "react";

const BackdropVideo = () => {
  return (
    <video muted autoPlay loop playsInline preload="auto" width="100%">
      <source
        src="https://accdistribution.eu/wp-content/uploads/2022/09/ACC_graphic_animation_hero.mp4"
        type="video/mp4"
      />
    </video>
  );
};

export default BackdropVideo;
