import React, { Component, useState, useEffect } from 'react';
import Head from './Head';

import { language, domain } from '../lib/consts';
import styles from './App.module.css';
import RandContext from '../lib/RandContext';
import init from '../lib/rand';
const generator = init();

const App = (props) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    changePalette({ preventDefault: () => {} });
  }, []);

  //https://stackoverflow.com/questions/61310847/how-to-set-html-lang-attribute-dynamically-on-nextjs-document
  useEffect(() => {
    document.documentElement.lang = language;
  }, []);

  const changePalette = (e) => {
    e.preventDefault();
    //https://stackoverflow.com/questions/49411796/how-do-i-detect-i-am-on-server-vs-client-in-next-js
    if (!process.browser) return;

    var colorHue;
    var timeout;
    const defaultHue = '216'; //greenish blue
    const storageHue = localStorage.getItem('colorHue');
    if (count == 0) colorHue = storageHue || defaultHue;
    else if (count == 1 && storageHue !== defaultHue) colorHue = defaultHue;
    else colorHue = '' + Math.floor(Math.random() * 360);

    const cssColors = {
      '--color-l': `hsl(${colorHue}, 75%, 60%)`,
      '--color': `hsl(${colorHue}, 75%, 50%)`,
      '--color-d': `hsl(${colorHue}, 75%, 40%)`,
      '--color-h': `hsl(${parseInt(colorHue) + 15}, 75%, 50%)`,
    };

    for (var cssName in cssColors)
      document.documentElement.style.setProperty(cssName, cssColors[cssName]);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setCount(1);
    }, 1000);
    localStorage.setItem('colorHue', colorHue);
    setCount((c) => c + 1);
  };

  return (
    <RandContext.Provider value={generator}>
      <Head
        title={`Emilien Breton | ${props.title}`}
        description={props.description}
        image={`https://${domain}/${props.image}`}
      />
      <div className={styles.App}>{props.children}</div>
    </RandContext.Provider>
  );
};

export default App;
