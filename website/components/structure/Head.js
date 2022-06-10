import React, { Component } from 'react';
import NextHead from 'next/head';
import Script from 'next/script';

const Head = (props) => {
  return (
    <NextHead>
      <meta charSet="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, height=device-height, initial-scale=1.0"
      />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:image" content={props.image} />
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <meta name="apple-mobile-web-app-title" content="Emilien Breton" />
      {/* https://stackoverflow.com/questions/2208933/how-do-i-force-a-favicon-refresh */}
      <link rel="shortcut icon" href="/icon.png?v=4" />
      <link rel="apple-touch-icon" href="/icon.png?v=4" />
      {/* https://support.google.com/tagassistant/answer/2947093?hl=en */}
      {/* https://chrome.google.com/webstore/detail/tag-assistant-by-google/kejbdjndbnbjgmefkgdddjlbokphdefk/related?hl=en */}
      {/* https://developers.google.com/analytics/devguides/collection/gtagjs */}
      {/* Global site tag (gtag.js) - Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=UA-163126541-1"
        strategy="afterInteractive"
      />
      <script>
        {/*window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-163126541-1');*/}
      </script>
      {/* End Global site tag */}
      <script>{/*console.log('Google Test 0.16');*/}</script>
      {/* https://github.com/markedjs/marked */}
      {/* https://highlightjs.org/download/ */}
      {/* https://fonts.google.com/specimen/Roboto?category=Sans+Serif */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
        rel="stylesheet"
      />
      {/* https://github.com/tonsky/FiraCode */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/firacode@6.2.0/distr/fira_code.css"
      />
    </NextHead>
  );
};

export default Head;
