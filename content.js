function onKeyDown(e) {
  if (isEditable(document.activeElement)) {
    return;
  }
  switch (e.key) {
    case ' ':
      togglePause();
      break;
    case '[':
      adjustSpeed(-0.1);
      break;
    case ']':
      adjustSpeed(+0.1);
      break;
    case 'p':
      seek(+3);
      break;
    case 'o':
      seek(-3);
      break;
    case '\\':
      skip();
      break;
    default:
      return;
  }
  e.preventDefault();
}

function withVideoPlayer(callback) {
  const videoPlayers = Array.from(document.querySelectorAll('video'));
  console.log('Found', videoPlayers.length, 'video players.');
  videoPlayers.forEach(callback);
}

function isEditable(element) {
  return element.isContentEditable ||
      element.tagName == 'INPUT' ||
      element.tagName == 'TEXTAREA';
}

function togglePause() {
  withVideoPlayer(async (videoPlayer) => {

    const isPaused = videoPlayer.paused;
    console.log('isPaused', isPaused);
    await sleep(250);
    console.log('videoPlayer.paused', videoPlayer.paused);
    if (videoPlayer.paused !== isPaused) {
      console.log('The website itself already toggled pause.');
      return;
    }
    if (videoPlayer.paused) {
      console.log('unpausing');
      videoPlayer.play();
    } else {
      console.log('pausing');
      videoPlayer.pause();
    }

  });
}

function adjustSpeed(delta) {
  withVideoPlayer((videoPlayer) => {

    videoPlayer.playbackRate += delta;
    console.log(`playbackRate = ${videoPlayer.playbackRate}`);

  });
}

function seek(delta) {
  withVideoPlayer((videoPlayer) => {

    videoPlayer.currentTime += delta;

  });
}

function sleep(millis) {
  return new Promise((resolve) => {
    setTimeout(resolve, millis);
  });
}

async function skip() {
  withVideoPlayer(async (videoPlayer) => {

    const delta = 5;
    videoPlayer.playbackRate += delta;
    console.log(`playbackRate = ${videoPlayer.playbackRate}`);

    await sleep(1000);

    videoPlayer.playbackRate -= delta;
    console.log(`playbackRate = ${videoPlayer.playbackRate}`);
  });
}

document.body.addEventListener('keydown', onKeyDown, true /* capture */);
