## What is a Keylogger?

A _keylogger_ is a relatively simple hardware or software device that logs the keys typed on a keyboard. Here is the definition of a _keylogger_ from Wikipedia:

> Keystroke logging, often referred to as keylogging or keyboard capturing, is the action of recording (logging) the keys struck on a keyboard, typically covertly, so that person using the keyboard is unaware that their actions are being monitored. Data can then be retrieved by the person operating the logging program.
>
> [Wikipedia](https://en.wikipedia.org/wiki/Keystroke_logging)

In my opinion, _software keyloggers_ are way better than [hardware ones](https://en.wikipedia.org/wiki/Hardware_keylogger) for a few reasons, which is why I decided to make one. Here are some of the reasons why I decided to make a software keylogger:

- They do not require physical access to a computer
- They can be used without [specialized hardware](https://en.wikipedia.org/wiki/Hardware_keylogger)
- They have way more options when it comes to retrieving the logs
- They can easily steal passwords, so...
  If you woud like to see how the logs of this keylogger look, you can [click here](./log.txt)!

## How it Works

The keylogger I made is very simple: it works in 3 easy steps.

First, the keylogger listens for key presses. It does so with the following lines of code:

```C++
int keyState = GetAsyncKeyState(k);
if(keyState == -32767){
  // [...]
}
```

It loops through every key on the keyboard and verifies if it has been pressed using the [`GetAsyncKeyState`](https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getasynckeystate) function. If the function returns `-32767`, it means that the key that was passed in as a parameter was pressed once since the last call to the function. However, this only allows us to know the `key code` of the key.

Second, the keylogger needs to take the `key code` of the key that was pressed and transform it into the corresponding [`ASCII`](http://www.asciitable.com/) character, so that we can see which character was typed insted of its `key code`. In order to do so, the keylogger uses the following code:
#code

```C++
int ret = ToAsciiEx(k, MapVirtualKeyEx(k, 0, keyboardLayout), keyboardState, buffer, 0, keyboardLayout);
if(ret == 1) str = std::string("") + (char)buffer[0];
else if(ret == 2) str = "?";
else str = "[" + std::to_string((unsigned char)k) + "]";
```

The first part of the code calls the [`ToAsciiEx`](https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-toasciiex) function, which transforms `key codes` into `ASCII` characters using the current keyboard layout. The second part of the code is for error handling: if `ToAsciiEx` throws an error, the `key code` is displayed inside of square brackets instead (`[` and `]`) to still be able to see that a key was pressed.

Third, the keylogger logs the keys using the `log` function:

```C++
std::cout << str;
log(str, "log.txt");
```

It simply appends the key that was pressed to a file called _log.txt_. [Click here](./log.txt) to see how the logs look! I didn't implement any complicated logging system so that it could be modified easily. If you really want, you could modify this keylogger to send the key strokes to a remote server, just like my Raspberry Pi server. You can [click here](../Raspberry-Pi-server) to read about how it works!

## How to Get it

You might be wondering at this point...

> How can I get such an awesome and advanced piece of matrix-like technology for myself???

Actually, it isn't that simple... You can [click here](./New/main.cpp) to see the source code of the keylogger, but you will have to compile it for yourself using a `C++` compiler, like _[g++](https://www.cs.bu.edu/fac/gkollios/cs113/Usingg++.html)_ for example. Moreover, it is illegal to use a keylogger without the victim's consent in most countries, so I am not responsible for any trouble that this program might cause.

## Conclusion

I had already programmed a keylogger before, but it wasn't as good as this one. For example, it wasn't able to register capital letters or symbols made using the `Shift` key, or any other symbols for that matter. I learned a lot about how to translate key codes to actual `ASCII` characters using windows libraries, which is certainely going to be very useful in the future. This wasn't an easy journey, but I am very happy with the result!
