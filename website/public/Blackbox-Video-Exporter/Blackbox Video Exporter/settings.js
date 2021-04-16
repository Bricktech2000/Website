settings.fps = 30;
settings.movingAverageDuration = .1;
settings.height = 1080;
settings.width = 1080 * 2 / 9;
settings.padding = 12;
settings.borderRadius = 12;
settings.background = '#000';
settings.background2 = '#222';
settings.color = '#fff';
settings.accent = '#ccc';
settings.font = '24px arial';
settings.cameraAngle = 0;
settings.cameraFOV = 70;
settings.fpvAspectRatio = 4 / 3; //4:3 aspect ratio
settings.log = function(m){
  console.log(m);
  var div = document.createElement('div');
  div.textContent = m + '\n';
  settings.logDiv.appendChild(div);
}