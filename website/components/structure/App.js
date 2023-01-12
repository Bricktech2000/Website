import React, { Component, useState, useEffect } from 'react';
import Head from './Head';

import { domain } from '../../records/consts';
import styles from './App.module.css';

const App = (props) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    changePalette({ preventDefault: () => {} });
  }, []);

  const changePalette = (e) => {
    e.preventDefault();
    // https://stackoverflow.com/questions/49411796/how-do-i-detect-i-am-on-server-vs-client-in-next-js
    if (!process.browser) return;

    // reset hues that were previously used as the default hue in older versions of the site
    const oldHues = ['216', '203'];
    if (oldHues.includes(localStorage.getItem('colorHue')))
      localStorage.removeItem('colorHue');

    let colorHue;
    let timeout;
    const defaultHue = '210'; // greenish blue
    const storageHue = localStorage.getItem('colorHue');
    if (count == 0) colorHue = storageHue ?? defaultHue;
    else if (count == 1 && storageHue !== defaultHue) colorHue = defaultHue;
    else colorHue = '' + Math.floor(Math.random() * 360);

    const cssColors = {
      '--color-l': `hsl(${colorHue}, 100%, 67%)`,
      '--color': `hsl(${colorHue}, 100%, 57%)`,
      '--color-d': `hsl(${colorHue}, 100%, 47%)`,
      '--color-h': `hsl(${parseInt(colorHue) + 15}, 75%, 50%)`,
    };

    for (let cssName in cssColors)
      document.documentElement.style.setProperty(cssName, cssColors[cssName]);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setCount(1);
    }, 1000);
    localStorage.setItem('colorHue', colorHue);
    setCount((c) => c + 1);
  };

  return (
    <React.Fragment>
      <Head
        title={`Emilien Breton | ${props.title}`}
        description={props.description}
        image={`https://${domain}/${props.image}`}
      />
      <div className={styles.App}>
        <div className={styles.overlay + ' ' + styles.colored} />
        <div className={styles.overlay + ' ' + styles.grayscale} />
        {props.children}
      </div>
    </React.Fragment>
  );
};

export default App;
