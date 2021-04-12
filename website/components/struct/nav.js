import React, { Component } from 'react';
import redirect from '../redirect';

import './nav.module.css';
//https://stackoverflow.com/questions/42296499/how-to-display-svg-icons-svg-files-in-ui-using-react-component
import Logo from '../svgs/logo.svg';
import Posts from '../svgs/007-order.svg';
import Search from '../svgs/050-search.svg';
import Github from '../svgs/045-cat.svg';
import Theme from '../svgs/032-summer.svg';

class Nav extends Component {
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
      <nav className="Nav">
        <a href="/" onClick={redirect} className="lg-hover">
          <Logo />
        </a>
        <a href="/posts/" onClick={redirect}>
          <Posts />
        </a>
        <a href="/search/" onClick={redirect}>
          <Search />
        </a>
        <a
          href="https://github.com/Bricktech2000/Website"
          target="_blank"
          rel="noreferrer"
        >
          <Github />
        </a>
        <a href="/" onClick={/*this.changeTheme*/ null}>
          <Theme />
        </a>
      </nav>
    );
  }
}

export default Nav;
