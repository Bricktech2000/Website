//https://stackoverflow.com/questions/37112218/css3-100vh-not-constant-in-mobile-browser
var resize = function () {
  var vh = 0;
  if (window.screen.availWidth > 1000)
    //yield consts.phone.replace('px', '')
    vh = window.outerHeight / 100;
  else vh = Math.max(window.screen.availHeight, window.innerWidth) / 100;
  document.documentElement.style.setProperty('--vh', vh + 'px');
};
window.addEventListener('resize', resize);
window.addEventListener('focus', resize);
resize();
