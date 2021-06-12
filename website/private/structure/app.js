import React, { Component } from 'react';
import Head from './head';

import styles from './app.module.css';
import { init } from '../api/rand';
init();

class App extends Component {
  state = {};
  constructor() {
    super();
    this.count = 0;
    this.changeTheme({ preventDefault: () => {} });
  }

  changeTheme = (e) => {
    e.preventDefault();
    //https://stackoverflow.com/questions/49411796/how-do-i-detect-i-am-on-server-vs-client-in-next-js
    if (!process.browser) return;

    var colors;
    var defaults = ['#ff8f0d', '#df6f08', '#df4f00', '#fa0'];
    var storage = JSON.parse(localStorage.getItem('lastColors'));
    if (this.count === 0) colors = storage || defaults;
    else if (this.count === 1 && storage.toString() !== defaults.toString())
      colors = defaults;
    else {
      var color = Math.floor(Math.random() * 360);
      colors = [
        `hsl(${color}, 75%, 60%)`,
        `hsl(${color}, 75%, 50%)`,
        `hsl(${color}, 75%, 40%)`,
        `hsl(${color + 30}, 75%, 50%)`,
      ];
    }
    document.documentElement.style.setProperty('--color-l', colors[0]);
    document.documentElement.style.setProperty('--color', colors[1]);
    document.documentElement.style.setProperty('--color-d', colors[2]);
    document.documentElement.style.setProperty('--color-h', colors[3]);
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => (this.count = 1), 1000);
    localStorage.setItem('lastColors', JSON.stringify(colors));
    this.count++;
  };

  render() {
    return (
      <React.Fragment>
        <Head />
        <div className={styles.App}>{this.props.children}</div>
      </React.Fragment>
    );
  }
}

export default App;
