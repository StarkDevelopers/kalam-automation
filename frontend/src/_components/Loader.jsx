import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../_assets/animations/loader.json'

export default function Loader() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  return <Lottie options={defaultOptions} isStopped={false} height={150} width={150} isPaused={false} isClickToPauseDisabled={true} />
}
