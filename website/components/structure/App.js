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

    // reset hues that were previously used as the default hue in older versions of the site
    const oldHues = ['216', '203'];
    if (oldHues.includes(localStorage.getItem('colorHue')))
      localStorage.removeItem('colorHue');

    const defaultHue = 210; // greenish blue
    const storageHue = parseInt(localStorage.getItem('colorHue'));

    let colorHue;
    if (count == 0) colorHue = storageHue || defaultHue;
    else if (count == 1 && storageHue !== defaultHue) colorHue = defaultHue;
    else colorHue = Math.floor(Math.random() * 360);

    const cssColors = {
      '--color-l': `hsl(${colorHue}, 100%, 67%)`,
      '--color': `hsl(${colorHue}, 100%, 57%)`,
      '--color-d': `hsl(${colorHue}, 100%, 47%)`,
    };

    for (let cssName in cssColors)
      document.documentElement.style.setProperty(cssName, cssColors[cssName]);

    localStorage.setItem('colorHue', colorHue);
    setCount((c) => c + 1);
    setTimeout(() => {
      setCount(1);
    }, 1000);
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
