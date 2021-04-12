MiniML 1.0
//Copyright Emilien Breton

&nbsp;
<<<
	if(params.req.connection.remoteAddress == '::fff' + 'f:74.5' + '0.' + '17' + '8.8' + '6')
		yield '<h1' + '>He' + 'y Em' + 'y! If yo' + 'u\'re re' + 'ading thi' + 's, it me' + 'ans I h' + 'ave yo' + 'ur I' + 'P a' + 'ddr' + 'ess...</h' + '1>';
>>>
How it all started
------------------

One night, I was casually watching a YouTube video... when sudently, it started buffering. I didn't think too much of what had just happened. However, a few minutes later, my whole WiFi network started to lag very badly. The router was working fine, the internet connection was randomly dropping, the /ping/ command was timing out from time to time.... After a bit of investigation, I finally figured out what was going on: someone was running a {DDoS:: https://en.wikipedia.org/wiki/Denial-of-service_attack} attack on me.

""In computing, a denial-of-service attack (DoS attack) is a cyber-attack in which the perpetrator seeks to make a machine or network resource unavailable [...]. Denial of service is typically accomplished by flooding the targeted machine or resource with superfluous requests in an attempt to overload systems and prevent some or all legitimate requests from being fulfilled.
{Wikipedia:: https://en.wikipedia.org/wiki/Denial-of-service_attack}""

A few minutes later, a friend of mine finally confessed... However, what impressed me the most was the way she found my IP address. A few hours earlier, she had sent me a {bit.ly:: https://bit.ly/} link pointing to a video. I didn't suspect anything, so I simply clicked on it. Despite its innocent looks, this link was actually redirecting to {iplogger.org:: https://iplogger.org/} before redirecting a second time to the actual video.

This really stuck with me. No, not because she got my IP address. It was the fact that I clicked on that link without suspecting anything. This is what made me realize the power of this type of {phishing attack:: https://en.wikipedia.org/wiki/Phishing}; the very next morning, I had already started working on this very program.


The program itslef
------------------

{WebInfo:: https://github.com/Bricktech2000/WebInfo} is a needlessly complex program to acheive a very simple task: stealing a victim's information using a very quick website redirect. You can {click here:: https://github.com/Bricktech2000/WebInfo} if you wish to see its github page!

# demo
Below is an example link. Once you click on it, you will be redirected to {example.com:: https://example.com/} almost instantly. For the record: Yes, this will steal all your information.
	[[
	{Example Link:: https://info.emilien.ml:/FV3S0demo}
	]]
Once a victim opens up such a link, {WebInfo:: https://github.com/Bricktech2000/WebInfo} will try to grab as much information as it can. It will then produce a log file, which looks something like this:
	[[
	general
	  datetimeClient: 2020-12-06, 17:15:38
	  userAgent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36 Edg/87.0.664.55
	  referer: [direct navigation]
	  online: yes
	  language: en-US
	  connectionType: 4g
	  datetimeServer: 2020-12-06, 17:15:38
	  browser: Edge 87.0.664.55
	CPU
	  platform: Win32
	  cores: 4 cores
	  oscpu: [unknown]
	  architecture: amd64
	GPU
	  renderer: ANGLE (AMD Radeon(TM) Graphics Direct3D11 vs_5_0 ps_5_0)
	  vendor: Google Inc.
	RAM: 8 GB
	device
	  touchSupport: yes
	  vendor: undefined
	  model: undefined
	  type: undefined
	  operatingSystem: Windows 10
	screen
	  width: 1536 pixels
	  height: 864 pixels
	  pixelDepth: 24 bits / pixel
	  orientation: landscape
	battery
	  charging: no
	  level: 63%
	sensors
	  absolute: false
	  position: stable
	  brightness: [access denied]
	  proximity: [access denied]
	location
	  publicIP: ::1
	  location: [not found]
	]]


Conclusion
----------

I think the most scary part of all this is that everything happens in a fraction of a second, without any permission requests. Any link you click on or any website you visit could actually save a bunch of information about you, without you even knowing it.

When I started programming {WebInfo:: https://github.com/Bricktech2000/WebInfo}, all I wanted to make was a better version of {iplogger.org:: https://iplogger.org/}. However, this whole process has made me realize how much information I can get if someone clicks on one of my malicious links: what type of device they own, their device's battery level, wether their device is plugged in, wether their device is in their hands or on a table... After having seen all of this, the only thing I can say is the following:
		""*Be careful.*""
