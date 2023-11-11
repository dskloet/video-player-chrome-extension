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

function isEditable(element) {
  return element.isContentEditable ||
      element.tagName == 'INPUT' ||
      element.tagName == 'TEXTAREA';
}

async function togglePause() {
  const videoPlayer = document.querySelector('video');
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
}

function adjustSpeed(delta) {
  var videoPlayer = document.querySelector('video');
  videoPlayer.playbackRate += delta;
  console.log(`playbackRate = ${videoPlayer.playbackRate}`);
}

function seek(delta) {
  var videoPlayer = document.querySelector('video');
  videoPlayer.currentTime += delta;
}

function sleep(millis) {
  return new Promise((resolve) => {
    setTimeout(resolve, millis);
  });
}

function skip() {
  var videoPlayer = document.querySelector('video');
  const delta = 5;
  videoPlayer.playbackRate += delta;
  console.log(`playbackRate = ${videoPlayer.playbackRate}`);
  sleep(1000).then(() => {
    videoPlayer.playbackRate -= delta;
    console.log(`playbackRate = ${videoPlayer.playbackRate}`);
  });

  (document.querySelector('.ytp-ad-skip-button') ||
   document.querySelector('.ytp-ad-skip-button-modern') ||
   document.querySelector('.ytp-ad-overlay-close-button') ||
   document.querySelector('#masthead-ad [aria-label=Close]') ||
   { click: () => { console.log('No skip button found.'); } }).click();
}

document.body.addEventListener('keydown', onKeyDown, true /* capture */);
