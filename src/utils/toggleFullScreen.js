export const toggleFullScreen = {
  on(document) {
    document.documentElement.requestFullscreen();
  },
  off(document) {
    document.exitFullscreen();
  },
};

export const isFullScreenMode = (document) => {
  return (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullscreenElement ||
    document.msFullscreenElement
  );
};
