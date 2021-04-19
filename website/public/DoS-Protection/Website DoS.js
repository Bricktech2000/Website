const request = require('request').defaults({ rejectUnauthorized: false }); //https://stackoverflow.com/questions/10888610/ignore-invalid-self-signed-ssl-certificate-in-node-js-with-https-request

//get parameters from user input
getParameters();

//a function to log stats
var sent = 0;
var resp = 0;
var error = '';
function updateConsole(){
  //stdout.write to prevent newline
  process.stdout.write('\r');
  process.stdout.write('   Sent: ' + sent);
  process.stdout.write('   Resp: ' + resp);
  process.stdout.write('   Response Ratio: ' + (resp / sent *  100).toFixed(2) + '%');
  process.stdout.write('   Status: ' + error);
  process.stdout.write('   ');
}

//set an interval to load requests
setInterval(function(){
  sent++;
  updateConsole();
  //send the request and log when it gets responded to
  request(url, function(err, res, body){
    updateConsole();
    error = 'ONLINE'
    if(err) error = err.code;
    else resp++;
  });
}, 1000 / rps);


//function to get parameters from user input
function getParameters(){
  const rl = require('readline-sync');
  /*const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });*/
  url = rl.question('URL (default emilien.ml/TIH4G): ');
  if(url == '') url = 'https://emilien.ml/TIH4G'; //emilien.ml 192.168.1.2
  rps = parseInt(rl.question('Requests per Second (default 20): '));
  if(isNaN(rps)) rps = 20;
}
