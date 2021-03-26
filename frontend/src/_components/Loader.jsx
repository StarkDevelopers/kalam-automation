import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../_assets/animations/animation.json'

export default function Loader() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  return <Lottie options={defaultOptions} isStopped={false} height={300} width={300} isPaused={false} isClickToPauseDisabled={true} />
}
