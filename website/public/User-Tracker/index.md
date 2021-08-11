## Overview

[User Tracker](https://github.com/Bricktech2000/User-Tracker) is a webpage that assigns every user a unique ID and tracks them regardless of which device or IP address they are using. It is ideal for specific applications such as a ban tracking system. [Click here](https://track.emilien.ca/) to view it!

## How it Works

This tracker is decievingly simple but surprisingly effective.

When a user visits a website, the web browser automatically sends some information to the server to help it respond to the request. It includes the following:

- The browser user agent
- The user's public IP address
- The cookies saved by the website

The server then uses a [user agent parser](https://www.npmjs.com/package/ua-parser-js) along with an [IP lookup library](https://www.npmjs.com/package/geoip-lite) to extract the following data from the user:

- Operating system name and version
- Device vendor, model and type
- CPU architecture
- Browser name and version
- User region, city, longitude and latitude
- Device timezone
- Browser cookies

Finally, the server runs the acquired data against its database. If the current user data is similar enough to a known user, they are considered to be the same. If no match is found, a new entry is created for the current user.

To improve user tracking further, the server uses a clever trick to detect wether a user is trying to evade it. In short, when the current user data is not an exact match to the data stored in the database, the back-end code keeps track of all the descrepencies.

> It remembers which device you are using. In fact, it remembers **every device** you ever used. If you use a VPN, **it will know**. If you go in Incognito mode, **it will know**. If you clear your cookies, **it will know**.

If you want to try to fool [this user tracker](https://github.com/Bricktech2000/User-Tracker) for yourself, just [click here](https://track.emilien.ca/)!

## What I Learned

I didn't really learn any new technologies when creating [this tracker](https://github.com/Bricktech2000/User-Tracker). I programmed a rough back-end and, when I saw how well it worked, I quickly glued together a front-end page. However, I did learn how to `set` and `get` cookies directly from the server, so there's that.

This program reminds me of another project of mine, called [WebInfo](../WebInfo/). Before creating it, I didn't know just how much information a webpage could collect without any user interaction. Now that I programmed [User Tracker](https://github.com/Bricktech2000/User-Tracker), I understand how easy it is to track users without them even knowing about it. Moving forward, I will approach online anonymity with **a lot** more care.
