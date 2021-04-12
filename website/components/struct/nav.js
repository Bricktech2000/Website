import React, { Component } from 'react';
import redirect from '../redirect';
import Link from 'next/link';

import styles from './nav.module.css';
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
    var Logo2 = React.forwardRef(({ onClick, href }, ref) => (
      <a href={href} onClick={onClick} className={'lg-hover'}>
        <Logo />
      </a>
    ));
    var Posts2 = React.forwardRef(({ onClick, href }, ref) => (
      <a
        href={href}
        onClick={(e, ...args) => {
          function cloneEvent(e) {
            function ClonedEvent() {}
            let clone = new ClonedEvent();
            for (let p in e) {
              let d = Object.getOwnPropertyDescriptor(e, p);
              if (
                d &&
                (!d.writable ||
                  !d.configurable ||
                  !d.enumerable ||
                  d.get ||
                  d.set)
              ) {
                Object.defineProperty(clone, p, d);
              } else {
                clone[p] = e[p];
              }
            }
            Object.setPrototypeOf(clone, e);
            return clone;
          }
          window.scrollTo(0, 0);
          setTimeout(onClick, 150, cloneEvent(e), ...args);
        }}
        className={this.props.highlight == 'posts' ? styles['svg-on'] : ''}
      >
        <Posts />
      </a>
    ));
    var Search2 = React.forwardRef(({ onClick, href }, ref) => (
      <a
        href={href}
        onClick={onClick}
        className={this.props.highlight == 'search' ? styles['svg-on'] : ''}
      >
        <Search />
      </a>
    ));
    return (
      //https://nextjs.org/docs/api-reference/next/link
      <nav className={styles.Nav}>
        <Link href="/">
          <Logo2 />
        </Link>
        <Link href="/posts">
          <Posts2 />
        </Link>
        <Link href="/search">
          <Search2 />
        </Link>
        <a
          href="https://github.com/Bricktech2000/Website"
          target="_blank"
          rel="noreferrer"
        >
          <Github />
        </a>
        <a href="/" onClick={this.changeTheme}>
          <Theme />
        </a>
      </nav>
    );
  }
}

export default Nav;
