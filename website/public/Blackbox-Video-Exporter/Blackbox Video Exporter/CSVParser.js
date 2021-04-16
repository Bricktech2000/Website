CSVParser = {
  parse: function(text, func){
    var obj = {};
    var lines = text.split('\n');
    for(var l = 0; l < lines.length / 1; l++){
      var arr = lines[l].split(',');
      for(var i = 0; i < arr.length; i++){
        arr[i] = replaceBy(arr[i], /^[^"]*$/g, function(num){
          var float = parseFloat(num);
          if(isNaN(float)) return num;
          return float;
        });
        if(arr[i].replace) arr[i] = arr[i].replace(/^"(.*)"$/g, '$1');
      }
      func(obj, arr);
    }
    return obj;
  }
}

function replaceBy(str, regex, func){
  match = str.match && str.match(regex);
  if(match) return func(match);
  else return str;
}
