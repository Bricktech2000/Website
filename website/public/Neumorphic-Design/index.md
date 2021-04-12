MiniML 1.0
//Copyright Emilien Breton

About Neumorphism
-----------------

While modern design focuses on /floating/ containers, neumorphic design tries to make containers *extrude* out of the background. The following picture from {UX Design:: https://uxdesign.cc/neumorphism-in-user-interfaces-b47cef3bf3a6} demonstrates that perfectly.
	{{./modern vs neumorphism.jpeg}}
When I first saw it, I got hooked instantly. I looked up {inspiration on Google:: https://www.google.com/search?q=neumorphism&tbm=isch#imgrc=iRoyzjKXJ5iv2M} and found the following image, which I based {my design:: ./Neumorphic-Design/neumorphism.html} on:
	{{./neumorphism-ui-design.png}}


My Design
---------

If you wish to try out my design for yourself, you can {click here:: ./Neumorphic-Design/neumorphism.html}! All elements have both click and hover effects. When one clicks a button, it looks like it moves through the 3rd dimension, which was achieved by changing the [blur] and [offset]s of the shadows used. For any one interested, the switches are animated using a simple [click] handler and a [class.toggle()]. The CSS transitions on the switch itself are responsible for making the movement look very smooth.


Final Words
---------

I started this project wanting to make a single animated button, but ended up making a full suite of interactive [UI] elements. Time will tell if I decide to turn {this design:: ./Neumorphic-Design/neumorphism.html} into a complete [CSS] library!
