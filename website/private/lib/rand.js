//the following is ment to create a PRNG that generates the exact same numbers for a URL unless the webpage or web app is refreshed
//it is ideal for UI that is to be generated randomly but that is still required look the exact same when the browser's `back` button is pressed, for example
//in this website, it is currently used to generate a mosaic of project cards (structure/mosaicLarge.js and structure/mosaicSmall.js)

//once per page load, call the `init` function (called within structure/app.js in this case)
//inside a component's constructor, write the following to create a random number generator: `this.rand = generator()`
//to then generate a random number inside said component, call `this.rand()`

//https://github.com/vercel/next.js/discussions/12348
import { Router } from 'next/router';

//https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
function xmur3(str) {
  for (var i = 0, h = 1779033703 ^ str.length; i < str.length; i++)
    (h = Math.imul(h ^ str.charCodeAt(i), 3432918353)),
      (h = (h << 13) | (h >>> 19));
  return function() {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^= h >>> 16) >>> 0;
  };
}
function mulberry32(a) {
  return function() {
    var t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

//note: this function is called within structure/app.js
export function init() {
  //generate a random 32-bit number on every page refresh
  const refreshSeed = Math.floor(Math.random() * Math.pow(2, 32));
  var generateSeed = (url) => {
    //generate a 32-bit seed based on the current URL
    const routeSeed = xmur3(url)();
    //create a 32-bit seed by XORing the refresh seed and the route seed together
    //this has the effect of creating the same seed every time a URL is visited, but generating a completely different set of seeds when the page is refreshed
    seed[0] = refreshSeed ^ routeSeed;
  };
  Router.events.on('routeChangeStart', generateSeed);
  generateSeed('/');
}

var seed = [0x00];

export default function generator() {
  return mulberry32(seed[0]);
}
