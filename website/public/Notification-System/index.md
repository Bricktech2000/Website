MiniML 1.0
//Copyright Emilien Breton


The Idea
--------

It is one of my friends who first got the idea for a notification system on my website. I had done some research about web notifications about 2 months ago, but never got around to implementing it. However, recently, I figured I would go ahead and do it!


# on
Turning Notifications On
------------------------

It is very simple to activate notifications for this website. On the {home page: ../../}, under /Recent Projects/, there is a toggle called /Receive Notifications/. If you wish to receive a notification every time a new post is published, simply turn it on! As a bonus, here is a copy of this button if you do not fancy visiting the home page to do so:
	<<<yield include('../../body/partial/subscribe.html')>>>

# code
The Implementation
------------------

The way a notification system works is fairly simple. Here is a process diagram for such a system:


[[
client   →   /subscription  →  server   ⥂   subscription database
&nbsp;&nbsp;&nbsp;⇓                              ⇓
service worker    ←    notification API
]]
First, the client makes an [HTTP POST] request to [/subscribe] in order to tell the server it wishes to receive notifications from my website. Then, the server receives said subscription and saves its data to a [JSON] file, which is used as a database. When the server wishes to send out a notification to the clients, it reads the list of subscriptions from disk, sends it to a {notification API:: https://www.npmjs.com/package/web-push}, which in turn sends it to the service worker registered on the client. The service worker finally shows a notification with the required title, description and icon using the following function:


[[
self.addEventListener('push', event = > {
&nbsp;&nbsp;var data = event.data.json();
&nbsp;&nbsp;self.registration.showNotification(data.title, data);
});
]]

For anyone interested, below is the code used to send a notification to the clients of the website. Once a a new post has been added to the website [pages != lastPages], it requests all required information from the latest post [parsed[Object.keys(parsed)[0\]\]] and sends a new notification to every client in the notification database [consts.sendNotification(\{/*...*/\})].


[[ 
if(pages != lastPages)\{
&nbsp;&nbsp;/*...*/
&nbsp;&nbsp;var parsed = JSON.parse(pages);
&nbsp;&nbsp;var info = JSON.parse((await include('..\/..\/pages\/' + parsed[Object.keys(parsed)[0]\] + '/info.json')).text);
&nbsp;&nbsp;consts.sendNotification(\{
&nbsp;&nbsp;&nbsp;&nbsp;title: 'New Post: ' + info.title,
&nbsp;&nbsp;&nbsp;&nbsp;body: info.desc,
&nbsp;&nbsp;&nbsp;&nbsp;icon: '/icon.png',
&nbsp;&nbsp;\});
\}
]]


Conclusion
----------

I thought a {notification system: .} would be an easy feature to implement... but it turns out it really isn't. In total, I spent about 7 hours working on it before it finally functionned as intended. I got everything from NodeJS version issues to missing dependencies and cryptic error messages. All in all, I am still very happy with what I managed to achieve!
