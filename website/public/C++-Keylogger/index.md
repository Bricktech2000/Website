## What is a Keylogger?

A _keylogger_ is a relatively simple hardware or software device that logs the keys typed on a keyboard. Here is the definition of a _keylogger_ from Wikipedia:

> Keystroke logging, often referred to as keylogging or keyboard capturing, is the action of recording (logging) the keys struck on a keyboard, typically covertly, so that person using the keyboard is unaware that their actions are being monitored. Data can then be retrieved by the person operating the logging program.
>
> [Wikipedia](https://en.wikipedia.org/wiki/Keystroke_logging)

In my opinion, in most cases, _software keyloggers_ are better than [hardware ones](https://en.wikipedia.org/wiki/Hardware_keylogger) for a few reasons, which is why I opted for the former. Here are some of the reasons why I decided to make a software keylogger:

- They do not require physical access to a computer
- They can be used without [specialized hardware](https://en.wikipedia.org/wiki/Hardware_keylogger)
- They have way more options when it comes to retrieving their logs

## How it Works

The keylogger I made is very simple; it works in 3 main steps.

First, the keylogger listens for key presses. It does so with the following lines of code:

```C++
int keyState = GetAsyncKeyState(k);
if(keyState == -32767){
  // [...]
}
```

It loops through every key on the keyboard and checks whether it has been pressed using the [`GetAsyncKeyState`](https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getasynckeystate) function. If the function returns `-32767`, it means that the key it was passed as a parameter was pressed once since the last call to the function. However, this only allows us to know the `key code` of the key.

Second, the keylogger needs to take the `key code` of the key that was pressed and transform it into the corresponding [`ASCII`](http://www.asciitable.com/) character, so that we can retrieve the actual character that was typed insted of its `key code`. In order to do so, the keylogger uses the following code:
#code

```C++
int ret = ToAsciiEx(k, MapVirtualKeyEx(k, 0, keyboardLayout), keyboardState, buffer, 0, keyboardLayout);
if(ret == 1) str = std::string("") + (char)buffer[0];
else if(ret == 2) str = "?";
else str = "[" + std::to_string((unsigned char)k) + "]";
```

The first part of the code calls the [`ToAsciiEx`](https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-toasciiex) function, which transforms `key codes` into `ASCII` characters using the current keyboard layout. The second part of the code is for error handling: if `ToAsciiEx` throws an error, the `key code` is displayed inside of square brackets instead (i.e. `[116]`) to still be able to see that a key was pressed.

Third, the keylogger logs the characters it has just decoded using the `log` function:

```C++
std::cout << str;
log(str, "log.txt");
```

It simply appends the key that was pressed to a file called _log.txt_. [Click here](./log.txt) to see what the logs look like! I didn't implement any complicated logging system so that it could be modified easily. If you wanted, you could modify this keylogger to send the key strokes to a remote server, such as my [Raspberry Pi server](../Raspberry-Pi-Server).

## How to Get it

You might be wondering at this point...

> How can I get such an awesome program for myself?

You can [click here](./New/main.cpp) to download the source code of the keylogger, but you will have to compile it yourself using a `C++` compiler, such as _[g++](https://www.cs.bu.edu/fac/gkollios/cs113/Usingg++.html)_. With that said, keep in mind that it is illegal to use a keylogger without the victim's consent in most countries; use this program at your own risk and make sure to do your own research before using it.

## Conclusion

I had already programmed a keylogger before, but it was way worse that this one. For instance, it wasn't able to register capital letters or symbols made using the `Shift` key, or any other symbols for that matter. I learned a lot about how to translate key codes to actual `ASCII` characters using the Windows API, which is certainely going to be very useful in the future. This wasn't an easy journey, but I am very happy with the result!
