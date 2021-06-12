import React, { Component } from 'react';
import NextHead from 'next/head';

class Head extends Component {
  state = {};
  render() {
    return (
      <NextHead>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0"
        />
        <title>Emilien Breton | Project Portfolio</title>
        <meta
          name="description"
          content="A website for sharing my projects and blogging about tech-related stuff!"
        />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-title" content="TechnoViper" />
        {/* https://stackoverflow.com/questions/2208933/how-do-i-force-a-favicon-refresh */}
        <link rel="shortcut icon" href="/icon.png?v=4" />
        <link rel="apple-touch-icon" href="/icon.png?v=4" />
        {/* https://support.google.com/tagassistant/answer/2947093?hl=en */}
        {/* https://chrome.google.com/webstore/detail/tag-assistant-by-google/kejbdjndbnbjgmefkgdddjlbokphdefk/related?hl=en */}
        {/* https://developers.google.com/analytics/devguides/collection/gtagjs */}
        {/* Global site tag (gtag.js) - Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-163126541-1"
        ></script>
        <script>
          {/*window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-163126541-1');*/}
        </script>
        {/* End Global site tag */}
        <script>{/*console.log('Google Test 0.16');*/}</script>
        <script src="/resize.js"></script>
        {/* https://github.com/markedjs/marked */}
        <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
        {/* https://highlightjs.org/download/ */}
        <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.2/highlight.min.js"></script>
        <script src="/marked.min.js"></script>
        <script src="/highlight.min.js"></script>
      </NextHead>
    );
  }
}

export default Head;
