MiniML 1.0
//Copyright Emilien Breton


The Problem
-----------

I've always had issues regarding time management, especially related to {procrastination:: https://en.wikipedia.org/wiki/Procrastination}. After giving this issue some thought, I got to understand what was causing me to rush assignments last-minute: I didn't have any way to see a summary of everything I had to do in one single place. For instance, I use Google Calendar to take note of the date at which an assignment is due for, but I didn't have any way to see its progress visually. This is exactly where {this program:: https://github.com/Bricktech2000/Google-Calendar-Automation} comes in.


The Solution
------------

This program has *two inputs* and *one output*. It uses the current progress of a task or assignment I have to complete and its start and end dates, and generates a priority factor that ranges form [0] to [1]. Once said factor is calculated, it gets mapped to a color identifier array before it modifies the actual color of the event in Google Calendar. Here is a list of the colors from lowest to highest priority, along with their color codes:

[#616161] <div class="color-square" style="background: #616161;"><\/div>  •  [#3f51b5] <div class="color-square" style="background: #3f51b5;"><\/div>  •  [#0b8043] <div class="color-square" style="background: #0b8043;"><\/div>  •  [#33b679] <div class="color-square" style="background: #33b679;"><\/div>  •  [#f6c026] <div class="color-square" style="background: #f6c026;"><\/div>  •  [#f5511d] <div class="color-square" style="background: #f5511d;"><\/div>  •  [#d60000] <div class="color-square" style="background: #d60000;"><\/div>
<link rel="stylesheet" href="./color-square.css">
Below is example of my schedule, which is color coded automatically using this program. As you can see, the assignment called /PE reflexion/ is colored red because it is due today and is currently [0%] completed (oops), and the assignment called /C2 math chap trig/ is colored purple because I feel like I am [75%] ready for it, even though it is going to take place more than in two weeks time. There are also some greyed out assignments, which basically means I am already done with them.
	{{Screenshot 2021-03-30 144710.png}}
As you can clearly see, by using this program, it is way easier to see which tasks I need to complete first with only a very quick glance at my calendar.

# demo
Finally, here is a quick demo of an event color updating automatically in Google Calendar when I change its progress percentage, while {the program:: https://github.com/Bricktech2000/Google-Calendar-Automation} is running on my linux server:
	[[
			{{video: ./20210330_151510.mp4}}
	]]

# try
Try it!
-------

If you wish to try out this program for yourself, simply visit its {github page:: https://github.com/Bricktech2000/Google-Calendar-Automation} and follow the instructions in the [README.md]. However, take note that when the program is granted access to your Google account, it could very well delete everything in your personnal calendar if anything goes wrong... Here goes the
	""I am not responsible for any constructive or destructive actions performed by {this program:: https://github.com/Bricktech2000/Google-Calendar-Automation} through intended and/or unintended behavior.""

Conclusion
----------

It was surprisingly easy to program this piece of software. In fact, the Google Calendar API used is very similar to the Google Drive API, which I used in {Auto Cloud Backup: ../OE1UD/}. The only slight annoyance was figuring out the maths for calculating the priority of the tasks in the calendar. After trying many operators such as divisions and substractions, it turned out that a simple call to [atan2] solved all my problems. I am  confident that this program will allow me to improve my time management skills in the very near future!
