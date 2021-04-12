MiniML 1.0
//Copyright Emilien Breton


How it all started
------------------

I'll spare you the details: *I do not like* Messenger's Activity system. I find it awesome to know when someone has just left the app a few minutes ago, but it really gets annoying for longer time periods. I do not want everyone to know I opened up Messenger [4 hours] ago or something... Sometimes, I just want to answer an important message and not feel obligated to respond to the [10] other people that happen to have sent me a message that day.

You are probably telling yourself:
	""Awesome idea, but isn't that already a Messenger Feature?""
Well it is. If you {turn it on:: https://www.indiatoday.in/information/story/how-to-turn-active-status-on-off-in-messenger-1700150-2020-07-13}, it will consider you as /active/ all the time. However, if you do, you will not be able to see anyone's activity status anymore. Since I still want to be able to see if people are active or not, this feature will not work for me. This is not irony, it is {an advantage I might have created myself:: https://youtu.be/vXBfwgwT1nQ?t=391}...



How it works
------------

This program is extremely simple, only consisting of about [50] source lines of code. To run it, you need to specify three parameters: your [username], your [password] and a [chatID]. The program opens up a browser using {selenium:: https://www.selenium.dev/}, logs you into Messenger and opens up a chat corresponding to the /chat ID/ specified as a commandline parameter. Then, I was faced with the hardest struggle of this whole program:
	""How do I make Messenger believe I currently active in this browser window?""
Well, turns out this was the easiest part. I thought I'd have to make the program move the mouse in a human-like manner, click on UI elements in the Messenger website, interact with many items in the webpage to complete a {CAPTCHA:: https://en.wikipedia.org/wiki/CAPTCHA}... In reality, the only thing I need the program to do to fool Messenger is to refresh the page every couple of minutes.

If you would like to see how this bot is programmed or would like to try it for yourself, don't forget to check its {Github:: https://github.com/Bricktech2000/Messenger-Always-Active}!

# demo
Demo
----

Unfortunately, there is only one way to prove that this bot works. If you are friends with me on Facebook, you can click on {this link:: https://www.messenger.com/t/100038113148924/} to see that I am active right now!


Conclusion
----------

This project was a quick one-nighter. I didn't have any experience using {selenium:: https://www.selenium.dev/} as a web bot, and I learned a lot about it while making this program. The hardest part of it all turned out to be porting the project from my [Windows] machine to my [Ubuntu] server, for it to run [24/7]. Who would have thought a screen is necesary to display the Messenger website? After a bit of tinkering, I managed to run {selenium:: https://www.selenium.dev/} through a {virtual frame buffer:: https://en.wikipedia.org/wiki/Xvfb}, which made the program work perfectly!

