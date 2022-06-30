import React, { Component, useEffect } from 'react';
import NextHead from 'next/head';
import { language } from '../../records/consts';

const Head = (props) => {
  // https://stackoverflow.com/questions/61310847/how-to-set-html-lang-attribute-dynamically-on-nextjs-document
  useEffect(() => {
    document.documentElement.lang = language;
  }, []);

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
      <link rel="shortcut icon" href="/icon.png?v=4" />
      <link rel="apple-touch-icon" href="/icon.png?v=4" />

      {/* https://github.com/markedjs/marked */}
      {/* https://highlightjs.org/download/ */}

      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      {/* https://fonts.google.com/specimen/Roboto?category=Sans+Serif */}
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
