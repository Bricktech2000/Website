<img src="ICON.png" height="140" align="right">

# Website

My personnal website, for sharing my projects and blogging about tech-related stuff!

## Overview

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It used to run on a custom framework called [reUpdate](https://github.com/Bricktech2000/reUpdate), but was converted to [React](https://reactjs.org/) for greater stability and maintainability.

This website is currently live at [https://emilien.ca/](https://emilien.ca/) and runs on a local machine used as a server. All traffic is proxied through [Cloudflare](https://www.cloudflare.com/) for DDoS protection and IP camouflage. Communication between Cloudflare and the local router uses nonstandard ports through [Cloudflare workers](https://workers.cloudflare.com/) to prevent script kiddies from discovering our network through ip scanning. Server also has root login disabled and uses a gibberish username to mitigate SSH login attempts from automated bots.

The security measures mentioned above might seem excessive, but after having dealt with DDoS attacks caused by an IP address leak, I can assure you they are indeed necessary.

## Getting Started

To get started with this website, first run the development server:

```bash
cd website/
npm install
npm run dev
```

Then, navigate to [http://localhost:80](http://localhost:80) to see the live website.

## Deployment

To deploy the website, build the project and run the server:

```bash
cd website/
npm install
npm run build
npm start
```

## Upgrading to HTTPS

First, install certbot and generate SSL certificates:

```bash
sudo apt-get update

sudo snap install core; sudo snap refresh core
sudo apt-get remove certbot
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

> If an error occurs, use an [alternative method](https://certbot.eff.org/instructions) for installing certbot.

```bash
sudo certbot certonly --standalone
```

> If an error occurs, ensure port forwarding is setup properly on your network and make sure no other programs are listening on port 80.

Then, once the certificates have been generated successfully, edit the following parameters under `website/server.mjs`:

```javascript
const https = true;
const dev = false;
const domain = 'YOUR_CERTBOT_DOMAIN.NAME';
```

Next, build the project and run the server:

```bash
cd website/
npm install
npm run build
npm start
```

> If an error occurs, ensure the server was executed with root privileges and make sure no other programs are listening on port 443. If the server cannot locate the SSL certificates, make sure they were generated successfully in the previous step.

Then, navigate to [https://localhost:443](https://localhost:443) to see the live website.
