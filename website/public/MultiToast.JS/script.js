//window.addEventListener('load', welcomeToast);
//setTimeout(function(){welcomeToast()}, 100);

(function(){
  //window.removeEventListener('load', welcomeToast)
  multiToast.iconPath = './../MultiToastJS/multiToastIcons/';
  multiToast.async().success().alert('This is MultiToast!');
  window.randomToast = async function(){
    var funcs = [
      async () => {await multiToast.success().toast('Operation Successful!')},
      async () => {await multiToast.error().modal().ask('An error occured. Would you like to try again?')},
      async () => {await multiToast.warn().async().timeout(5000).alert('The requested file has an incorrect SHA-256 hash.')},
      async () => {await multiToast.log().timeout(10000).prompt('Want to subscribe to our Newsletter?', 'Email')},
      async () => {await multiToast.error().auth('Wrong password, please try again.', 'Password')},
      async () => {await multiToast.info().toast('Fun fact: 1 + 2 = 3')},
    ]
    var i = Math.floor(Math.random() * funcs.length);
    //for(i in funcs)
    funcs[i]();
  }
})()
