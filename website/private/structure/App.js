import React, { Component } from 'react';
import Head from './Head';

import { domain } from '../lib/consts';
import styles from './App.module.css';
import { init } from '../lib/rand';
init();

class App extends Component {
  state = {};
  constructor() {
    super();
    this.count = 0;
    this.changePalette({ preventDefault: () => {} });
  }

  changePalette = (e) => {
    e.preventDefault();
    //https://stackoverflow.com/questions/49411796/how-do-i-detect-i-am-on-server-vs-client-in-next-js
    if (!process.browser) return;

    var colorHue;
    var defaultHue = '216'; //greenish blue
    var storageHue = localStorage.getItem('colorHue');
    if (this.count === 0) colorHue = storageHue || defaultHue;
    else if (this.count === 1 && storageHue !== defaultHue)
      colorHue = defaultHue;
    else colorHue = '' + Math.floor(Math.random() * 360);

    var cssColors = {
      '--color-l': `hsl(${colorHue}, 75%, 60%)`,
      '--color': `hsl(${colorHue}, 75%, 50%)`,
      '--color-d': `hsl(${colorHue}, 75%, 40%)`,
      '--color-h': `hsl(${parseInt(colorHue) + 15}, 75%, 50%)`,
    };

    for (var cssName in cssColors)
      document.documentElement.style.setProperty(cssName, cssColors[cssName]);
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => (this.count = 1), 1000);
    localStorage.setItem('lastColorHue', colorHue);
    this.count++;
  };

  render() {
    return (
      <React.Fragment>
        <Head
          title={`Emilien Breton | ${this.props.title}`}
          description={this.props.description}
          image={`https://${domain}/${this.props.image}`}
        />
        <div className={styles.App}>{this.props.children}</div>
      </React.Fragment>
    );
  }
}

export default App;
