export const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      console.log(
        `Error attempting to enable full-screen mode: ${err.message}`
      );
    });
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};
