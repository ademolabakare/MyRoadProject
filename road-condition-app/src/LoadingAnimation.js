// road-condition-app/src/LoadingAnimation.js
import React from 'react';

function LoadingAnimation() {
  return (
    <div className="loading-animation flex justify-center items-center h-full">
      <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
    </div>
  );
}

export default LoadingAnimation;
