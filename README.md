<img src="ICON.png" height="140" align="right">

# Website

A portfolio for sharing various projects

## Overview

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It used to run on a custom framework called [reUpdate](https://github.com/Bricktech2000/reUpdate), but was converted to [React](https://reactjs.org/) for greater stability and maintainability.

This website is currently live at [https://emilien.ca/](https://emilien.ca/) and runs on a local machine used as a server. All traffic is proxied through [Cloudflare](https://www.cloudflare.com/) for DDoS protection and IP camouflage. Communication between Cloudflare and the local router uses nonstandard ports through [Cloudflare workers](https://workers.cloudflare.com/) to prevent script kiddies from discovering our network through ip scanning. Server also has root login disabled and uses a gibberish username to mitigate SSH login attempts from automated bots.

The security measures mentioned above might seem excessive, but after having dealt with DDoS attacks caused by an IP address leak, I can assure you they are indeed necessary.

## Getting Started

To get started with this website, first run the development server:

```bash
cd website/
npm install
npm run dev -- -p 3000
```

Then, navigate to [http://localhost:3000](http://localhost:3000) to see the live website.

## Deployment

To deploy the website, build the project and run the server:

```bash
cd website/
npm install
npm run build
npm start -- -p 3000
```

Then, navigate to [http://localhost:3000](http://localhost:3000) to see the live website.
